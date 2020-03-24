const TITLES = {
  CASES: "number of cases",
  DEATHS: "number of deaths",
}

class ChartRenderer {
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
  
  parseSourceTable(tableClass, cellsParser) {
    console.log("parseSourceTable");
    return new Promise((resolve) => {
      const timer = setInterval(() => { 
        const rows = document.querySelectorAll(`tbody tr.${tableClass}`);
        if (rows.length > 10) {
          clearInterval(timer);
          const data = [];
          rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const entry = cellsParser(cells);
            if (entry) {
              data.push(entry);
            }
          });
  
          resolve(data);
        }
      }, 1000);
    });
  }

  renderChart(data, title, canvasClass) {
    console.log("renderChart");
    data.sort((a, b) => { return b.values[title] - a.values[title] });
    const chartData = data.slice(0, 100);
    const ctx = document.getElementById(canvasClass).getContext('2d');
    new Chart(ctx, {
      type: 'horizontalBar',
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
      data: {
        labels: chartData.map((d) => { return d.name } ),
        datasets: [{
            label: title,
            data: chartData.map((d) => { return d.values[title] } ),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        }]
      }
    });
  }

  run(tableClass, titles, canvasClasses, cellsParser) {
    this.loadSourceTable(tableClass).then(() => {
      this.parseSourceTable(tableClass, cellsParser).then((data) => {
        titles.forEach((title, index) => {
          this.renderChart(data, title, canvasClasses[index]);
        });
      });
    });
  }
}

function main() {
  document.querySelector(".updated-time").innerHTML = document.querySelector(".css-wcxsge").innerHTML;

  const chartRenderer = new ChartRenderer();

  chartRenderer.run(
    "svelte-1k3kd4i",
    [TITLES.CASES, TITLES.DEATHS],
    ["stateCases", "stateDeaths"],
    (cells) => {
      return {
        name: cells[0].innerText,
        values: {
          [TITLES.CASES]: parseInt(cells[1].innerText.replace(/,/, '')),
          [TITLES.DEATHS]: parseInt(cells[2].innerText.replace(/,/, '')),
        }
      };
    }
  );

  chartRenderer.run(
    "svelte-ffcf53",
    [TITLES.CASES],
    ["counties"],
    (cells) => {
      return cells[0].innerText === "District of Columbia" ? null : {
        name: cells[0].innerText + "/" + cells[1].innerText,
        values: {[TITLES.CASES]: parseInt(cells[2].innerText.replace(/,/, ''))}
      };
    }
  );
}

main();