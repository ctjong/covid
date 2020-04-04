import React from 'react';
import './App.css';
import {
  TAB_CONFIG,
  DATA_SOURCE,
  DATA_RETRIEVAL_CONFIG,
  CHART_TYPES,
  LINE_CHART_SCALES,
} from './Constants';
import { CovidData, ChartData } from './Types';
import NYTimesParser from './parsers/NewYorkTimesParser';
import { HorizontalBar, Line } from 'react-chartjs-2';
import IParser from './parsers/IParser';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Slider, CircularProgress } from '@material-ui/core';
import JohnHopkinsParser from './parsers/JohnHopkinsParser';
import { Chart } from 'chart.js';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const TAB_NAME_QUERY_PARAM = "chart";

type StateType = {
  allData: CovidData,
  allCharts: {[tabName:string]: ChartData},
  activeTabName: string,
  barChartRecordIndex: number,
  searchKeyword: string,
  activeChart: string,
  lineChartScale: string,
}

export default class App extends React.Component<{},StateType>{
  searchInputRef: React.RefObject<any>;
  colors: {[label:string]: string} = {};
  static parsers: {[dataSource:string]: IParser} = { 
    [DATA_SOURCE.NYTIMES]: new NYTimesParser(),
    [DATA_SOURCE.JOHNHOPKINS]: new JohnHopkinsParser(),
  };

  constructor(props: {}) {
    super(props);
    this.loadAllData();
    this.searchInputRef = React.createRef();
    Chart.defaults.global.defaultFontSize = 14;

    this.state = { 
      allData: null, 
      allCharts: {},
      activeTabName: this.getTabNameToSetAsActive(),
      barChartRecordIndex: -1,
      searchKeyword: null,
      activeChart: CHART_TYPES.BAR,
      lineChartScale: LINE_CHART_SCALES.LINEAR,
    };

    window.onpopstate = () => {
      this.setActiveTab(this.getTabNameToSetAsActive(), false);
    }
  }

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
    const { allData, activeTabName } = this.state;
    const data = allData[activeTabName];
    const record = data.records[recordIndex];
    const filteredEntries = !this.state.searchKeyword ? record.entries :
      record.entries.filter(d => d.name.toLowerCase().indexOf(this.state.searchKeyword) >= 0);
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

    let { barChartRecordIndex } = this.state;
    if (barChartRecordIndex < 0 || barChartRecordIndex >= data.records.length) {
      await this.setStateAsync({ barChartRecordIndex: data.records.length - 1 });
      barChartRecordIndex = this.state.barChartRecordIndex;
    }
    const barChartFilteredEntries = this.getFilteredEntries(barChartRecordIndex);
    const barTotal = barChartFilteredEntries.reduce((sum, next) => sum + next.value || 0, 0);
    const barChartEntries = barChartFilteredEntries.slice(0, 100);
    const barConfig = {
      labels: barChartEntries.map(entry => entry.name),
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
  
  async setActiveTab(tabName: string, shouldUpdateHistory: boolean) {
    this.searchInputRef.current.value = "";
    await this.setStateAsync({
      searchKeyword: "",
      barChartRecordIndex: -1,
      activeTabName: tabName
    });
    await this.updateActiveTabData();
    if (shouldUpdateHistory) {
      window.history.pushState(null, window.document.title, `?${TAB_NAME_QUERY_PARAM}=${tabName}`)
    }
  }
  
  async applySearch() {
    const textInput = this.searchInputRef.current;
    if (!this.state.allData) {
      textInput.value = "";
      return;
    }
    const searchKeyword = textInput.value.trim().toLowerCase();
    await this.setStateAsync({ searchKeyword });
    await this.updateActiveTabData();
  }
  
  async clearSearch() {
    const textInput = this.searchInputRef.current;
    textInput.value = "";
    await this.setStateAsync({ searchKeyword: "" });
    await this.updateActiveTabData();
  }

  async handleDateChange(index: number) {
    await this.setStateAsync({ barChartRecordIndex: index });
    await this.updateActiveTabData();
  }

  async handleSearchKeyPress(e:any) {
    if(e.key === 'Enter') { 
      await this.applySearch();
    }
  }
  
  getQueryParam(paramName:string){
    let href = window.location.href;
    let reg = new RegExp( '[?&]' + paramName + '=([^&#]*)', 'i' );
    let queryString = reg.exec(href);
    return queryString ? queryString[1] : null;
  }

  setStateAsync(stateDiff: any) {
    return new Promise(resolve => this.setState(stateDiff, resolve));
  }

  getTabNameToSetAsActive() {
    const tabNameParam = this.getQueryParam(TAB_NAME_QUERY_PARAM);
    return tabNameParam || Object.keys(TAB_CONFIG)[0];
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * Math.floor(255));
    const g = Math.floor(Math.random() * Math.floor(255));
    const b = Math.floor(Math.random() * Math.floor(255));
    return `${r},${g},${b}`;
  }

  handleChartTypeChange(value: string) {
    this.setState({ activeChart: value });
  }

  handleScaleChange(value: string) {
    this.setState({ lineChartScale: value });
  }

  render() {
    const { activeTabName, allData, allCharts, barChartRecordIndex, activeChart, lineChartScale } = this.state;
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
    const barChartHeight = barConfig.labels.length * 30 + 50;
    const shouldShowSlider = barChartRecordIndex >= 0 && barChartRecordIndex < tabData.records.length;

    return (
      <div className="app">
        <div className="header">

          <div className="title-container">
            <h2>{activeTab.title}</h2>

            <div>Sources: {activeTab.sources.map((source:any, index:number) => 
              <span key={index}>&nbsp;(<a target="_blank" rel="noopener noreferrer" href={source.link}>{source.text}</a>)</span>)}</div>

            <div className="search">
              <input type="text" id="search-text" ref={this.searchInputRef} onKeyPress={e => this.handleSearchKeyPress(e)}/>
              <button type="button" onClick={() => this.applySearch()}>Search</button>
              <button type="button" onClick={() => this.clearSearch()}>Clear</button>
            </div>
          </div>

          <div className="chart-links">
            <div>
              <label>Available charts:</label>
            </div>
            {
              Object.keys(TAB_CONFIG).map(tabName => {
                const config = TAB_CONFIG[tabName];
                if (tabName === activeTabName) {
                  return <div key={tabName}>{config.buttonText}</div>
                } else {
                  return <div key={tabName}><a onClick={() => this.setActiveTab(tabName, true)}>{config.buttonText}</a></div>
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
                <ToggleButton value={CHART_TYPES.BAR}>Top 100</ToggleButton>
                <ToggleButton value={CHART_TYPES.LINE}>Top 10 trend</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className={`chart ${CHART_TYPES.LINE}-chart`}>
            <div className="scale-selector">
              <ToggleButtonGroup 
                size="small"
                value={lineChartScale} 
                exclusive 
                onChange={(e:any, value:string) => this.handleScaleChange(value)}>
                  <ToggleButton value={LINE_CHART_SCALES.LINEAR}>Linear</ToggleButton>
                  <ToggleButton value={LINE_CHART_SCALES.LOG}>Logarithmic</ToggleButton>
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
                    type: lineChartScale === LINE_CHART_SCALES.LINEAR ? 'linear' : 'logarithmic'
                  }]}
                }}
              />
            </div>
          </div>

          <div className={`chart ${CHART_TYPES.BAR}-chart`}>
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
            <div className="chart-wrapper" style={{height:barChartHeight}}>
              <HorizontalBar
                data={barConfig}
                options={{
                  scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                  plugins: { datalabels: { anchor: 'end', align: 'end' } },
                  legend: { display: false },
                  maintainAspectRatio: false,
                }}
                plugins={[ChartDataLabels]}
              />
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