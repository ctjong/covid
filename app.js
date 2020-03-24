class App {
  activeTabName = "stateCases";
  allData = {};
  allCharts = {};
  tabRenderer = new TabRenderer();
  parsers = {
    [DATA_SOURCE.NYTIMES]: new NYTimesParser(),
  }
  
  loadAllData() {
    return new Promise(resolve => {
      let loadCount = 0;
      DATA_RETRIEVAL_CONFIG.forEach(config => {
        loadCount++;
        this.parsers[config.dataSource].retrieveData(
          this.allData,
          config.args.tableClass,
          config.args.cellsParsers
        ).then(() => {
          loadCount--;
          if (loadCount <= 0) {
            resolve();
          }
        });
      });
    });
  }
  
  display(tabName) {
    document.getElementById("search-text").value = "";
    document.querySelectorAll(".tab-pane").forEach(pane => pane.style.display = "none");
    document.getElementById(tabName).style.display = "block";
    this.activeTabName = tabName;
  }
  
  applySearch() {
    const textInput = document.getElementById("search-text");
    if (!this.allData) {
      textInput.value = "";
      return;
    }
    const searchKeyword = textInput.value.trim().toLowerCase();
    this.tabRenderer.renderTab(
      this.allData,
      this.allCharts,
      this.activeTabName,
      searchKeyword
    );
  }
  
  clearSearch() {
    const textInput = document.getElementById("search-text");
    textInput.value = "";
    this.tabRenderer.renderTab(
      this.allData,
      this.allCharts,
      this.activeTabName
    );
  }
  
  main() {
    this.loadAllData().then(() => {
      this.tabRenderer.renderTab(
        this.allData,
        this.allCharts,
        "stateCases",
      );
      this.tabRenderer.renderTab(
        this.allData,
        this.allCharts,
        "stateDeaths",
      );
      this.tabRenderer.renderTab(
        this.allData,
        this.allCharts,
        "countyCases",
      );
    });
  }
}