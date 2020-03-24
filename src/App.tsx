import React from 'react';
import './App.css';
import {
  TAB_CONFIG,
  DATA_SOURCE,
  DATA_RETRIEVAL_CONFIG,
} from './Constants';
import { CovidData } from './Types';
import NYTimesParser from './NewYorkTimesParser';
import { HorizontalBar } from 'react-chartjs-2';
import Parser from './IParser';

type StateType = {
  allData: CovidData,
  allCharts: {[tabName:string]: any},
  activeTabName: string,
  searchKeyword: string,
}

export default class App extends React.Component<{},StateType>{
  searchInputRef:React.RefObject<any>;
  parsers: {[dataSource:string]: Parser} = { 
    [DATA_SOURCE.NYTIMES]: new NYTimesParser()
  };

  constructor(props: {}) {
    super(props);
    this.loadAllData();
    this.searchInputRef = React.createRef();
    this.state = { 
      allData: null, 
      allCharts: {},
      activeTabName: Object.keys(TAB_CONFIG)[0],
      searchKeyword: null
    };
  }

  loadAllData() {
    let loadCount = 0;
    let parsedData: CovidData[] = [];
    new Promise(resolve => {
      DATA_RETRIEVAL_CONFIG.forEach(config => {
        loadCount++;
        this.parsers[config.dataSource].retrieveData(config.args).then(async (data) => {
          parsedData.push(data);
          loadCount--;
          if (loadCount <= 0) {
            resolve();
          }
        });
      });
    }).then(() => {
      let allData = {};
      parsedData.forEach(d => allData = { ...allData, ...d });
      this.setState({ allData });
    });
  }

  async updateTab(tabName: string) {
    const allCharts = { ...this.state.allCharts };
    const data = this.state.allData[tabName];
    const color = TAB_CONFIG[tabName].color;
    const title = TAB_CONFIG[tabName].title;

    const filteredData = !this.state.searchKeyword ? data.entries :
      data.entries.filter(d => d.name.toLowerCase().indexOf(this.state.searchKeyword) >= 0);
    filteredData.sort((a, b) => b.value - a.value);
    const total = filteredData.reduce((sum, next) => sum + next.value, 0);
    document.getElementById(`${tabName}-total`).innerHTML = `Total: ${total}`;
  
    const chartData = filteredData.slice(0, 100);
    allCharts[tabName] = {
      labels: chartData.map((d) => { return d.name } ),
      datasets: [{
          label: title,
          data: chartData.map((d) => { return d.value } ),
          backgroundColor: `rgba(${color}, 0.2)`,
          borderColor: `rgba(${color}, 1)`,
          borderWidth: 1,
      }]
    };

    await this.setState({ allCharts });
  }
  
  async setActiveTab(tabName: string) {
    await this.clearSearch();
    await this.setState({ activeTabName: tabName });
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

  render() {
    if (!this.state.activeTabName || !this.state.allData) {
      return null;
    }
    const tabName = this.state.activeTabName;
    const activeTab = TAB_CONFIG[tabName];
    const chart = this.state.allCharts[tabName];

    return (
      <div className="app">
        <div>
          {
            Object.keys(TAB_CONFIG).map(tabName => (
              <button 
                key={tabName}
                type="button"
                className={`btn ${TAB_CONFIG[tabName].buttonClass}`}
                onClick={() => this.setActiveTab(tabName)}>
                {TAB_CONFIG[tabName].buttonText}
              </button>
            ))
          }
        </div>

        <div id="search" style={{marginTop:"20px"}}>
          <input type="text" id="search-text" ref={this.searchInputRef}/>
          <button type="button" onClick={() => this.applySearch()}>Search</button>
          <button type="button" onClick={() => this.clearSearch()}>Clear</button>
        </div>

        <div>
          <h2>{activeTab.title}</h2>
          <div>Source: <a target="_blank" href={activeTab.srcLink}>{activeTab.srcText}</a></div>

          <div>{this.state.allData[tabName].updateTime}</div>
          <div id={`${tabName}-total`}></div>

          {!chart ? null : 
            <HorizontalBar
              data={this.state.allCharts[tabName]}
              width={1500}
              height={2000}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                plugins: { datalabels: { anchor: 'end', align: 'end' } },
              }}
            />
          }
        </div>
      </div>
    );
  }
}