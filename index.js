const TITLES = {
  CASES: "number of cases",
  DEATHS: "number of deaths",
}

const DATA_SOURCE = {
  NYTIMES: "nytimes",
}

const DATA_RETRIEVAL_CONFIG = [
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-1k3kd4i",
      cellsParsers: [
        {
          tabName: "stateCases",
          parser: cells => ({
            name: cells[0].innerText,
            value: parseInt(cells[1].innerText.replace(/,/, '')),
          })
        },
        {
          tabName: "stateDeaths",
          parser: cells => ({
            name: cells[0].innerText,
            value: parseInt(cells[2].innerText.replace(/,/, '')),
          })
        }
      ]
    }
  },
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-ffcf53",
      cellsParsers: [
        {
          tabName: "countyCases",
          parser: cells => ({
            name: cells[0].innerText + "/" + cells[1].innerText,
            value: parseInt(cells[2].innerText.replace(/,/, ''))
          })
        }
      ]
    }
  }
];

const TAB_CONFIG = {
  "stateCases": {
    title: TITLES.CASES,
    color: "54, 162, 235"
  },
  "stateDeaths": {
    title: TITLES.DEATHS,
    color: "255, 206, 86"
  },
  "countyCases": {
    title: TITLES.CASES,
    color: "255, 99, 132"
  },
}

class TabRenderer {
  renderTab(allData, allCharts, tabName, searchKeyword) {
    console.log("renderTab");
    const data = allData[tabName];
    const color = TAB_CONFIG[tabName].color;
    const title = TAB_CONFIG[tabName].title;

    const filteredData = !searchKeyword ? data :
      data.filter(d => d.name.toLowerCase().indexOf(searchKeyword) >= 0);
    filteredData.sort((a, b) => b.value - a.value);
    const total = filteredData.reduce((sum, next) => sum + next.value, 0);
    document.getElementById(`${tabName}-total`).innerHTML = `Total: ${total}`;
  
    const chartData = filteredData.slice(0, 100);
    const ctx = document.getElementById(`${tabName}-canvas`).getContext('2d');
    const chartDataConfig = {
      labels: chartData.map((d) => { return d.name } ),
      datasets: [{
          label: title,
          data: chartData.map((d) => { return d.value } ),
          backgroundColor: `rgba(${color}, 0.2)`,
          borderColor: `rgba(${color}, 1)`,
          borderWidth: 1,
      }]
    };

    if (!allCharts[tabName]) {
      allCharts[tabName] = new Chart(ctx, {
        type: 'horizontalBar',
        options: { 
          scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          plugins: { datalabels: { anchor: 'end', align: 'end' } },
        },
        data: chartDataConfig
      });
    } else {
      allCharts[tabName].data = chartDataConfig;
      allCharts[tabName].update();
    }
  }
}

class NYTimesParser {
  loadSourceTable(tableClass) {
    console.log("loadSourceTable");
    return new Promise((resolve) => {
      const timer = setInterval(() => { 
        let button = document.querySelector(`button.${tableClass}`);
        if (button) {
          clearInterval(timer);
          button.click();
          resolve();
        }
      }, 1000);
    });
  }
  
  parseSourceTable(allData, tableClass, cellsParsers) {
    console.log("parseSourceTable");
    return new Promise((resolve) => {
      const timer = setInterval(() => { 
        const rows = document.querySelectorAll(`tbody tr.${tableClass}`);
        if (rows.length > 10) {
          clearInterval(timer);
          rows.forEach((row) => {
            cellsParsers.forEach(p => {
              const entry = p.parser(row.querySelectorAll("td"));
              if (!allData[p.tabName]) {
                allData[p.tabName] = [];
              }
              if (entry) {
                allData[p.tabName].push(entry);
              }
            });
          });
          resolve();
        }
      }, 1000);
    });
  }

  retrieveData(allData, tableClass, cellsParsers) {
    return new Promise(resolve => {
      this.loadSourceTable(tableClass).then(() => {
        this.parseSourceTable(allData, tableClass, cellsParsers).then(() => {
          document.querySelectorAll(".nytimes-time").forEach(el => {
            el.innerHTML = document.querySelector(".css-wcxsge").innerHTML
          });
          resolve();
        });
      });
    })
  }
}


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
    console.log("applySearch");
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
      console.log("main");
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

window.app = new App();
window.app.main();