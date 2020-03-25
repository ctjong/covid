import React from 'react';
import './App.css';
import {
  TAB_CONFIG,
  DATA_SOURCE,
  DATA_RETRIEVAL_CONFIG,
} from './Constants';
import { CovidData, NameValueCollection } from './Types';
import NYTimesParser from './parsers/NewYorkTimesParser';
import { HorizontalBar } from 'react-chartjs-2';
import IParser from './parsers/IParser';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, InputLabel, Select, MenuItem, Slider, Typography } from '@material-ui/core';
import JohnHopkinsParser from './parsers/JohnHopkinsParser';

type StateType = {
  allData: CovidData,
  allCharts: NameValueCollection,
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
    document.getElementById(`${tabName}-total`).innerHTML = `Total: ${total}`;
  
    const chartEntries = filteredEntries.slice(0, 100);
    allCharts[tabName] = {
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

  getChartHeight() {
    if (window.innerWidth < 500) {
      return window.innerWidth * 3;
    } else if (window.innerWidth < 750) {
        return window.innerWidth * 2;
    } else if (window.innerWidth < 1000) {
      return window.innerWidth;
    } else if (window.innerWidth < 1250) {
      return window.innerWidth * 0.5;
    } else {
      return window.innerWidth * 0.25;
    }
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
    if (!this.state.activeTabName || !this.state.allData) {
      return null;
    }
    const tabName = this.state.activeTabName;
    const activeTab = TAB_CONFIG[tabName];
    const chart = this.state.allCharts[tabName];
    const tabData = this.state.allData[tabName];
    const recordIndex = this.state.activeRecordIndex;

    return (
      <div className="app">
        <FormControl>
          <InputLabel id="chart-select-label">Select chart</InputLabel>
          <Select
            labelId="chart-select-label"
            id="chart-select"
            value={this.state.activeTabName}
            onChange={(e:any) => this.setActiveTab(e.target.value)}>
              {
                Object.keys(TAB_CONFIG).map(tabName => {
                  const config = TAB_CONFIG[tabName];
                  return <MenuItem value={tabName}>{config.buttonText}</MenuItem>
                })
              }
          </Select>
        </FormControl>

        <div id="search" style={{margin:"20px 0 50px"}}>
          <input type="text" id="search-text" ref={this.searchInputRef} onKeyPress={e => this.handleSearchKeyPress(e)}/>
          <button type="button" onClick={() => this.applySearch()}>Search</button>
          <button type="button" onClick={() => this.clearSearch()}>Clear</button>
        </div>

        <div>
          <h2>{activeTab.title}</h2>
          <div>Source: <a target="_blank" href={activeTab.srcLink}>{activeTab.srcText}</a></div>
          <div>{tabData.updateTime}</div>
          <div id={`${tabName}-total`}></div>

          {!activeTab.timeline || recordIndex < 0 || recordIndex >= tabData.records.length ? null :
            <div style={{margin: "20px 0"}}>
              <Slider
                className="date-slider"
                defaultValue={tabData.records.length - 1}
                valueLabelFormat={value => tabData.records[value].date}
                valueLabelDisplay="off"
                step={1}
                min={tabData.records.length - 31}
                max={tabData.records.length - 1}
                style={{ width:500 }}
                onChange={(ev: any, index: number) => this.handleDateChange(index) }
              />
              <div>Date: {tabData.records[recordIndex].date}</div>
            </div>
          }

          {!chart ? null : 
            <HorizontalBar
              data={this.state.allCharts[tabName]}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                plugins: { datalabels: { anchor: 'end', align: 'end' } },
              }}
              plugins={[ChartDataLabels]}
              height={this.getChartHeight()}
            />
          }
        </div>
      </div>
    );
  }
}