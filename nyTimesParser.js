class NYTimesParser {
  loadSourceTable(tableClass) {
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