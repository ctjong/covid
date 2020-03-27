import React from 'react';
import './App.css';
import {
  TAB_CONFIG,
  DATA_SOURCE,
  DATA_RETRIEVAL_CONFIG,
} from './Constants';
import { CovidData, NameValueCollection, ChartData } from './Types';
import NYTimesParser from './parsers/NewYorkTimesParser';
import { HorizontalBar } from 'react-chartjs-2';
import IParser from './parsers/IParser';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Slider, CircularProgress } from '@material-ui/core';
import JohnHopkinsParser from './parsers/JohnHopkinsParser';

type StateType = {
  allData: CovidData,
  allCharts: {[tabName:string]: ChartData},
  activeTabName: string,
  activeRecordIndex: number,
  searchKeyword: string,
}

export default class App extends React.Component<{},StateType>{
  searchInputRef:React.RefObject<any>;
  parsers: {[dataSource:string]: IParser} = { 
    [DATA_SOURCE.NYTIMES]: new NYTimesParser(),
    [DATA_SOURCE.JOHNHOPKINS]: new JohnHopkinsParser(),
  };

  constructor(props: {}) {
    super(props);
    this.loadAllData();
    this.searchInputRef = React.createRef();
    this.state = { 
      allData: null, 
      allCharts: {},
      activeTabName: Object.keys(TAB_CONFIG)[0],
      activeRecordIndex: -1,
      searchKeyword: null,
    };
  }

  loadAllData() {
    let loadCount = 0;
    let allData: CovidData = {};
    new Promise(resolve => {
      DATA_RETRIEVAL_CONFIG.forEach(config => {
        loadCount++;
        this.parsers[config.dataSource].retrieveData(config.args).then(async (data) => {
          allData = { ...allData, ...data };
          loadCount--;
          if (loadCount <= 0) {
            resolve();
          }
        });
      });
    }).then(async () => {
      await this.setState({ allData })
      await this.updateTab(this.state.activeTabName);
    });
  }

  async updateTab(tabName: string) {
    const allCharts = { ...this.state.allCharts };
    const data = this.state.allData[tabName];
    const tabConfig = TAB_CONFIG[tabName];

    let record;
    if (tabConfig.timeline) {
      let { activeRecordIndex } = this.state;
      if (activeRecordIndex < 0 || activeRecordIndex >= data.records.length) {
        await this.setState({ activeRecordIndex: data.records.length - 1 });
        activeRecordIndex = this.state.activeRecordIndex;
      }
      record = data.records[activeRecordIndex];
    } else {
      record = data.records[data.records.length - 1];
    }
    
    const filteredEntries = !this.state.searchKeyword ? record.entries :
      record.entries.filter(d => d.name.toLowerCase().indexOf(this.state.searchKeyword) >= 0);
      filteredEntries.sort((a, b) => b.value - a.value);
    const total = filteredEntries.reduce((sum, next) => sum + next.value, 0);
  
    const chartEntries = filteredEntries.slice(0, 100);
    allCharts[tabName] = {
      total,
      labels: chartEntries.map((e) => { return e.name } ),
      datasets: [{
          label: tabConfig.chartLabel,
          data: chartEntries.map((e) => { return e.value } ),
          backgroundColor: `rgba(${tabConfig.color}, 0.2)`,
          borderColor: `rgba(${tabConfig.color}, 1)`,
          borderWidth: 1,
      }]
    };

    await this.setState({ allCharts });
  }
  
  async setActiveTab(tabName: string) {
    this.searchInputRef.current.value = "";
    await this.setState({
      searchKeyword: "",
      activeRecordIndex: -1,
      activeTabName: tabName
    });
    await this.updateTab(this.state.activeTabName);
  }
  
  async applySearch() {
    const textInput = this.searchInputRef.current;
    if (!this.state.allData) {
      textInput.value = "";
      return;
    }
    const searchKeyword = textInput.value.trim().toLowerCase();
    await this.setState({ searchKeyword });
    await this.updateTab(this.state.activeTabName);
  }
  
  async clearSearch() {
    const textInput = this.searchInputRef.current;
    textInput.value = "";
    await this.setState({ searchKeyword: "" });
    await this.updateTab(this.state.activeTabName);
  }

  async handleDateChange(index: number) {
    await this.setState({ activeRecordIndex: index });
    await this.updateTab(this.state.activeTabName);
  }

  async handleSearchKeyPress(e:any) {
    if(e.key === 'Enter') { 
      await this.applySearch();
    }
  }

  render() {
    if (!this.state.activeTabName || !this.state.allData || !this.state.allCharts[this.state.activeTabName]) {
      return (
        <div className="loading">
          <CircularProgress />
          <div>Please wait</div>
        </div>
      );
    }

    const activeTabName = this.state.activeTabName;
    const activeTab = TAB_CONFIG[activeTabName];
    const chart = this.state.allCharts[activeTabName];
    const tabData = this.state.allData[activeTabName];
    const recordIndex = this.state.activeRecordIndex;
    const activeChart = this.state.allCharts[activeTabName];
    const chartHeight = activeChart.labels.length * 20 + 50;

    return (
      <div className="app">
        <div className="header">
          <div className="title-container">
            <h2>{activeTab.title}</h2>
            <div>Source: <a target="_blank" rel="noopener noreferrer" href={activeTab.srcLink}>{activeTab.srcText}</a></div>
            <div>{tabData.updateTime}</div>
            <div>Total: {activeChart.total}</div>
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
                  return <div>{config.buttonText}</div>
                } else {
                  return <div><a href="#" onClick={() => this.setActiveTab(tabName)}>{config.buttonText}</a></div>
                }
              })
            }
          </div>
        </div>

        <div className="chart-controls">
          {
            !activeTab.timeline || recordIndex < 0 || recordIndex >= tabData.records.length ?
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
              <div>Date: {tabData.records[recordIndex].date}</div>
            </div>
          }
          {
            !chart ?
            null :
            <div className="chart-container" style={{height:chartHeight}}>
              <HorizontalBar
                data={activeChart}
                options={{
                  scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                  plugins: { datalabels: { anchor: 'end', align: 'end' } },
                  legend: { display: false },
                  maintainAspectRatio: false,
                }}
                plugins={[ChartDataLabels]}
              />
            </div>
          }
        </div>

        <div className="footer">
          <div>&copy;&nbsp;{new Date().getFullYear()}&nbsp;<a href="http://www.ctjong.com" target="_blank">Christopher Tjong</a>. All Rights Reserved.</div>
        </div>
      </div>
    );
  }
}