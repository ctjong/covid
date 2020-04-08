import React from 'react';
import './App.css';
import {
  TAB_CONFIG,
  DATA_SOURCE,
  DATA_RETRIEVAL_CONFIG,
  CHART_TYPE,
  SCALE_TYPE,
} from './Constants';
import { CovidData, ChartData, NameValueCollection } from './Types';
import NYTimesParser from './parsers/NewYorkTimesParser';
import { HorizontalBar, Line } from 'react-chartjs-2';
import IParser from './parsers/IParser';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Slider, CircularProgress } from '@material-ui/core';
import JohnHopkinsParser from './parsers/JohnHopkinsParser';
import { Chart } from 'chart.js';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const TAB_NAME_QUERY_PARAM = "chart";
const CHART_TYPE_QUERY_PARAM = "type";
const SCALE_TYPE_QUERY_PARAM = "scale";
const SEARCH_TYPE_QUERY_PARAM = "search";

type StateType = {
  allData: CovidData,
  allCharts: {[tabName:string]: ChartData},
  activeTabName: string,
  barChartRecordIndex: number,
  searchInputText: string,
  activeSearch: string,
  activeChart: string,
  activeScale: string,
  shareUrl: string,
}

export default class App extends React.Component<{},StateType>{
  colors: {[label:string]: string} = {};
  static parsers: {[dataSource:string]: IParser} = { 
    [DATA_SOURCE.NYTIMES]: new NYTimesParser(),
    [DATA_SOURCE.JOHNHOPKINS]: new JohnHopkinsParser(),
  };

  constructor(props: {}) {
    super(props);
    this.loadAllData();
    Chart.defaults.global.defaultFontSize = 14;
    const { tabName, chartType, scaleType, search } = this.getParamsOrDefault();

    this.state = { 
      allData: null, 
      allCharts: {},
      activeTabName: tabName,
      barChartRecordIndex: -1,
      searchInputText: "",
      activeChart: chartType,
      activeScale: scaleType,
      activeSearch: search,
      shareUrl: window.location.href,
    };

    window.onpopstate = () => {
      const { tabName, chartType, scaleType, search } = this.getParamsOrDefault();
      this.setActiveView(tabName, chartType, scaleType, search, false);
    }
  }
  
  //-------------------------------------
  // DATA
  //-------------------------------------

  loadAllData() {
    let loadCount = 0;
    let allData: CovidData = {};
    new Promise(resolve => {
      DATA_RETRIEVAL_CONFIG.forEach(config => {
        loadCount++;
        App.parsers[config.dataSource].retrieveData(config.args).then(async (data) => {
          allData = { ...allData, ...data };
          loadCount--;
          if (loadCount <= 0) {
            resolve();
          }
        });
      });
    }).then(async () => {
      await this.setStateAsync({ allData })
      await this.updateActiveTabData();
    });
  }

  getFilteredEntries(recordIndex: number) {
    const { allData, activeTabName, activeSearch } = this.state;
    const data = allData[activeTabName];
    const record = data.records[recordIndex];
    const filteredEntries = !activeSearch ? record.entries :
      record.entries.filter(d => d.name.toLowerCase().indexOf(activeSearch) >= 0);
      filteredEntries.sort((a, b) => b.value - a.value);
    filteredEntries.forEach(entry => {
      if (!this.colors[entry.name]) {
        this.colors[entry.name] = this.getRandomColor();
      }
    });
    return filteredEntries;
  }

  async updateActiveTabData() {
    const { allCharts, activeTabName, allData } = this.state;
    const data = allData[activeTabName];
    const tabConfig = TAB_CONFIG[activeTabName];
    document.title = `Covid-19 Statistics | ${tabConfig.title}`;

    let { barChartRecordIndex } = this.state;
    if (barChartRecordIndex < 0 || barChartRecordIndex >= data.records.length) {
      barChartRecordIndex = data.records.length - 1;
      await this.setStateAsync({ barChartRecordIndex });
    }
    const barChartFilteredEntries = this.getFilteredEntries(barChartRecordIndex);
    const barTotal = barChartFilteredEntries.reduce((sum, next) => sum + next.value || 0, 0);
    const barChartEntries = barChartFilteredEntries.slice(0, 100);
    const barConfig = {
      labels: barChartEntries.map(entry => ""),
      barLabels: barChartEntries.map(entry => entry.name),
      datasets: [{
        label: tabConfig.chartLabel,
        data: barChartEntries.map(entry => entry.value),
        backgroundColor: barChartEntries.map(entry => `rgba(${this.colors[entry.name]}, 0.2)`),
        borderColor: barChartEntries.map(entry => `rgba(${this.colors[entry.name]}, 1)`),
        borderWidth: 1,
      }]
    };

    const lineChartFilteredEntries = this.getFilteredEntries(data.records.length - 1);
    const lineChartEntries = lineChartFilteredEntries.slice(0, 10);
    const lineRecords = data.records.slice(data.records.length - 30, data.records.length);
    const lineDates = lineRecords.map(record => record.date);
    const historicalData = lineChartEntries.map(entry => ({ 
      name: entry.name,
      values: lineRecords.map(record => (record.entries.find(pastEntry => pastEntry.name === entry.name) || {}).value)
    }));
    const lineConfig = {
      labels: lineDates,
      datasets: historicalData.map(historicalRecord => ({
        label: historicalRecord.name,
        data: historicalRecord.values,
        backgroundColor: [`rgba(${this.colors[historicalRecord.name]}, 0.2)`],
        borderColor: [`rgba(${this.colors[historicalRecord.name]}, 1)`],
        borderWidth: 1,
      }))
    };
    const logLineConfig = {
      labels: lineDates,
      datasets: historicalData.map(historicalRecord => ({
        label: historicalRecord.name,
        data: historicalRecord.values.map(value => Math.log10(value)),
        backgroundColor: [`rgba(${this.colors[historicalRecord.name]}, 0.2)`],
        borderColor: [`rgba(${this.colors[historicalRecord.name]}, 1)`],
        borderWidth: 1,
      }))
    };

    await this.setStateAsync({ allCharts: {
      ...allCharts, 
      [activeTabName]: { barTotal, barConfig, lineConfig, logLineConfig }
    }});
  }
  
  //-------------------------------------
  // HANDLERS
  //-------------------------------------

  handleSearchChange(event: any) {
    this.setState({ searchInputText: event.target.value })
  }
  
  async handleSearchBtnClick() {
    if (!this.state.allData) {
      await this.setStateAsync({ searchInputText: "" });
      return;
    }

    const { searchInputText } = this.state;
    const activeSearch = searchInputText.trim().toLowerCase();
    await this.setStateAsync({ activeSearch });
    await this.updateActiveTabData();

    const { tabName, scaleType, chartType } = this.getParamsOrDefault();
    this.updateURL(tabName, chartType, scaleType, activeSearch);
  }
  
  async handleClearSearch() {
    await this.setStateAsync({ searchInputText: "", activeSearch: null });
    await this.updateActiveTabData();

    const { tabName, scaleType, chartType } = this.getParamsOrDefault();
    this.updateURL(tabName, chartType, scaleType, null);
  }

  async handleDateChange(index: number) {
    await this.setStateAsync({ barChartRecordIndex: index });
    await this.updateActiveTabData();
  }

  async handleSearchKeyPress(e:any) {
    if(e.key === 'Enter') { 
      await this.handleSearchBtnClick();
    }
  }

  handleTabChange(value: string) {
    const { chartType, scaleType } = this.getParamsOrDefault();
    this.setActiveView(value, chartType, scaleType, null, true);
  }

  handleChartTypeChange(value: string) {
    const { tabName, scaleType, search } = this.getParamsOrDefault();
    this.setActiveView(tabName, value, scaleType, search, true);
  }

  handleScaleChange(value: string) {
    const { tabName, chartType, search } = this.getParamsOrDefault();
    this.setActiveView(tabName, chartType, value, search, true);
  }
  
  //-------------------------------------
  // UTIL
  //-------------------------------------

  getQueryParam(paramName:string){
    let href = window.location.href;
    let reg = new RegExp( '[?&]' + paramName + '=([^&#]*)', 'i' );
    let queryString = reg.exec(href);
    return queryString ? decodeURIComponent(queryString[1]) : null;
  }

  setStateAsync(stateDiff: any) {
    return new Promise(resolve => this.setState(stateDiff, resolve));
  }

  getParamsOrDefault() {
    const tabNameParam = this.getQueryParam(TAB_NAME_QUERY_PARAM);
    const chartTypeParam = this.getQueryParam(CHART_TYPE_QUERY_PARAM);
    const scaleTypeParam = this.getQueryParam(SCALE_TYPE_QUERY_PARAM);
    const searchParam = this.getQueryParam(SEARCH_TYPE_QUERY_PARAM);
    const tabName = tabNameParam || Object.keys(TAB_CONFIG)[0];
    const chartType = chartTypeParam || CHART_TYPE.BAR;
    const scaleType = scaleTypeParam || SCALE_TYPE.LINEAR;
    const search = searchParam || "";
    return { tabName, chartType, scaleType, search };
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * Math.floor(255));
    const g = Math.floor(Math.random() * Math.floor(255));
    const b = Math.floor(Math.random() * Math.floor(255));
    return `${r},${g},${b}`;
  }
  
  async setActiveView(tabName: string, chartType: string, scaleType: string, search: string, shouldUpdateURL: boolean) {
    await this.setStateAsync({
      barChartRecordIndex: -1,
      activeTabName: tabName,
      activeChart: chartType,
      activeScale: scaleType,
      activeSearch: search,
      searchInputText: search || "",
    });
    await this.updateActiveTabData();

    if (shouldUpdateURL) {
      this.updateURL(tabName, chartType, scaleType, search);
    }
  }

  updateURL(tabName: string, chartType: string, scaleType: string, search: string) {
    const params: NameValueCollection = {
      [TAB_NAME_QUERY_PARAM]: tabName,
      [CHART_TYPE_QUERY_PARAM]: chartType,
      [SCALE_TYPE_QUERY_PARAM]: chartType === CHART_TYPE.LINE ? scaleType : null,
      [SEARCH_TYPE_QUERY_PARAM]: search,
    };
    const paramStr = Object.keys(params)
      .filter(key => !!params[key])
      .map(key => `${key}=${params[key]}`).join("&");
    window.history.pushState(null, window.document.title, `?${paramStr}`);

    this.setState({ shareUrl: window.location.href });
  }
  
  //-------------------------------------
  // RENDER
  //-------------------------------------

  render() {
    const { activeTabName, allData, allCharts, barChartRecordIndex, activeChart, activeScale, searchInputText, shareUrl } = this.state;
    if (!activeTabName || !allData || !allCharts[activeTabName]) {
      return (
        <div className="loading">
          <CircularProgress />
          <div>Please wait</div>
        </div>
      );
    }

    const activeTab = TAB_CONFIG[activeTabName];
    const tabData = allData[activeTabName];
    const { barTotal, barConfig, lineConfig } = allCharts[activeTabName];
    const barChartHeight = barConfig.labels.length * 30 + 40;
    const shouldShowSlider = barChartRecordIndex >= 0 && barChartRecordIndex < tabData.records.length;

    return (
      <div className="app">
        <div className="header">

          <div className="title-container">
            <h2>{activeTab.title}</h2>

            <div>Sources: {activeTab.sources.map((source:any, index:number) => 
              <span key={index}>&nbsp;(<a target="_blank" rel="noopener noreferrer" href={source.link}>{source.text}</a>)</span>)}</div>

            <div className="search">
              <input 
                type="text" 
                id="search-text"
                onKeyPress={e => this.handleSearchKeyPress(e)}
                onChange={(e:any) => this.handleSearchChange(e)}
                value={searchInputText} />
              <button type="button" onClick={() => this.handleSearchBtnClick()}>Search</button>
              <button type="button" onClick={() => this.handleClearSearch()}>Clear</button>
            </div>
          </div>

          <div className="share-links">
            <FacebookShareButton url={shareUrl}><FacebookIcon size={30} /></FacebookShareButton>
            <LinkedinShareButton url={shareUrl}><LinkedinIcon size={30} /></LinkedinShareButton>
            <RedditShareButton url={shareUrl}><RedditIcon size={30} /></RedditShareButton>
            <TwitterShareButton url={shareUrl}><TwitterIcon size={30} /></TwitterShareButton>
            <WhatsappShareButton url={shareUrl}><WhatsappIcon size={30} /></WhatsappShareButton>
          </div>

          <div className="chart-links">
            <div className="chart-links-header">
              <label>Available charts:</label>
            </div>
            {
              Object.keys(TAB_CONFIG).map(tabName => {
                const config = TAB_CONFIG[tabName];
                if (tabName === activeTabName) {
                  return <div key={tabName} className="chart-link">{config.buttonText}</div>
                } else {
                  return <div key={tabName} className="chart-link"><span onClick={() => this.handleTabChange(tabName)}>{config.buttonText}</span></div>
                }
              })
            }
          </div>
        </div>

        <div className={`chart-container ${activeChart}-active`}>
          <div className="chart-selector">
            <ToggleButtonGroup 
              size="small" 
              value={activeChart} 
              exclusive 
              onChange={(e:any, value:string) => this.handleChartTypeChange(value)}>
                <ToggleButton value={CHART_TYPE.BAR}>Top 100</ToggleButton>
                <ToggleButton value={CHART_TYPE.LINE}>Top 10 trend</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className={`chart ${CHART_TYPE.LINE}-chart`}>
            <div className="scale-selector">
              <ToggleButtonGroup 
                size="small"
                value={activeScale} 
                exclusive 
                onChange={(e:any, value:string) => this.handleScaleChange(value)}>
                  <ToggleButton value={SCALE_TYPE.LINEAR}>Linear</ToggleButton>
                  <ToggleButton value={SCALE_TYPE.LOG}>Logarithmic</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="chart-wrapper" style={{height: 800}}>
              <Line
                data={lineConfig}
                options={{
                  maintainAspectRatio: false,
                  plugins: { datalabels: { display: false } },
                  scales: { yAxes: [{ 
                    id: 'y-axis',
                    type: activeScale === SCALE_TYPE.LINEAR ? 'linear' : 'logarithmic'
                  }]}
                }}
              />
            </div>
          </div>

          <div className={`chart ${CHART_TYPE.BAR}-chart`}>
            {
              !shouldShowSlider ?
              null :
              <div className="slider-container">
                <Slider
                  className="date-slider"
                  defaultValue={tabData.records.length - 1}
                  valueLabelFormat={value => tabData.records[value].date}
                  valueLabelDisplay="off"
                  step={1}
                  min={tabData.records.length - 31}
                  max={tabData.records.length - 1}
                  onChange={(ev: any, index: number) => this.handleDateChange(index) }
                />
                <div>Date: {tabData.records[barChartRecordIndex].date}</div>
              </div>
            }
            <div>Total: {barTotal}</div>
            <div className="bar-wrapper">
              <div className="bar-labels">
                {barConfig.barLabels.map(label => <div key={label} className="bar-label">{label}</div>)}
              </div>
              <div className="chart-wrapper bar-chart-wrapper" style={{height:barChartHeight}}>
                <HorizontalBar
                  data={barConfig}
                  options={{
                    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                    plugins: { datalabels: { anchor: 'end', align: 'end' } },
                    legend: { display: false },
                    maintainAspectRatio: false,
                    tooltips: { callbacks: { label: function(tooltipItem) { 
                      return barConfig.barLabels[tooltipItem.index];
                    }}}
                  }}
                  plugins={[ChartDataLabels]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div>
            &copy;&nbsp;{new Date().getFullYear()}&nbsp;
            <a href="http://www.ctjong.com" target="_blank" rel="noopener noreferrer">Christopher Tjong</a>.
            All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}