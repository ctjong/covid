import React from 'react';
import './App.css';
import {
  TAB_CONFIG,
  DATA_SOURCE,
  DATA_RETRIEVAL_CONFIG,

} from './Constants';
import { CovidData } from './Types';
import TabRenderer from './TabRenderer';
import NYTimesParser from './NewYorkTimesParser';

type StateType = {
  allData: CovidData,
  allCharts: {[tabName:string]: any},
  activeTabName: string,
}

export default class App extends React.Component<{},StateType>{
  state = { allData: {}, allCharts: {}, activeTabName: "" };
  tabRenderer = new TabRenderer();
  parsers = {
    [DATA_SOURCE.NYTIMES]: new NYTimesParser(),
  }
  loadPromise:Promise<void> = null;
  searchInputRef:React.RefObject<any>;

  constructor(props: {}) {
    super(props);
    this.loadPromise = this.loadAllData();
    this.searchInputRef = React.createRef();
  }

  componentDidUpdate() {

  }

  loadAllData(): Promise<void> {
    return new Promise(resolve => {
      let loadCount = 0;
      DATA_RETRIEVAL_CONFIG.forEach(config => {
        loadCount++;
        let allData: CovidData = {};
        this.parsers[config.dataSource].retrieveData(
          allData,
          config.args.tableClass,
          config.args.cellsParsers
        ).then(async () => {
          loadCount--;
          if (loadCount <= 0) {
            await this.setState({ allData });
            resolve();
          }
        });
      });
    });
  }
  
  display(tabName: string): void {
    this.clearSearch();
    document.querySelectorAll(".tab-pane").forEach(pane => pane.style.display = "none");
    document.getElementById(tabName).style.display = "block";
    this.activeTabName = tabName;
  }
  
  applySearch(): void {
    const textInput = this.searchInputRef.current;
    if (!this.state.allData) {
      textInput.value = "";
      return;
    }
    const searchKeyword = textInput.value.trim().toLowerCase();
    this.tabRenderer.renderTab(
      this.state.allData,
      this.state.allCharts,
      this.state.activeTabName,
      searchKeyword
    );
  }
  
  clearSearch(): void {
    const textInput = this.searchInputRef.current;
    textInput.value = "";
    this.tabRenderer.renderTab(
      this.state.allData,
      this.state.allCharts,
      this.state.activeTabName
    );
  }

  render() {
    return (
      <div className="app">
        <div>
          {
            Object.keys(TAB_CONFIG).map(tabName => {
              <button type="button" className="btn btn-primary" onClick={() => this.display(tabName)}>
                {TAB_CONFIG[tabName].button}
              </button>
            })
          }
        </div>

        <div id="search" style={{marginTop:"20px"}}>
          <input type="text" id="search-text" ref={this.searchInputRef}/>
          <button type="button" onClick={() => this.applySearch()}>Search</button>
          <button type="button" onClick={() => this.clearSearch()}>Clear</button>
        </div>

        <div>
          {
            Object.keys(TAB_CONFIG).map(tabName => {
              <div id={tabName} className="tab-pane" style={{display:"none"}}>
                <h2>{TAB_CONFIG[tabName].title}</h2>
                <div>Source: <a target="_blank" href={TAB_CONFIG[tabName].srcLink}>{TAB_CONFIG[tabName].srcText}</a></div>
                <div className={TAB_CONFIG[tabName].timeClass}></div>
                <div id={`${tabName}-total`}></div>
                <canvas id={`${tabName}-canvas`} width="2000" height="1000"></canvas>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}