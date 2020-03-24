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

  renderChart(data, title, tabName, color) {
    console.log("renderChart");
    data.sort((a, b) => b.values[title] - a.values[title]);
    const total = data.reduce((sum, next) => sum + next.values[title], 0);
    document.getElementById(`${tabName}-total`).innerHTML = `Total: ${total}`;

    const chartData = data.slice(0, 100);
    const ctx = document.getElementById(`${tabName}-canvas`).getContext('2d');
    new Chart(ctx, {
      type: 'horizontalBar',
      options: { 
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        plugins: { datalabels: { anchor: 'end', align: 'end' }
      }
      },
      data: {
        labels: chartData.map((d) => { return d.name } ),
        datasets: [{
            label: title,
            data: chartData.map((d) => { return d.values[title] } ),
            backgroundColor: `rgba(${color}, 0.2)`,
            borderColor: `rgba(${color}, 1)`,
            borderWidth: 1,
        }]
      }
    });
  }

  run(tableClass, titles, tabNames, colors, cellsParser) {
    this.loadSourceTable(tableClass).then(() => {
      this.parseSourceTable(tableClass, cellsParser).then((data) => {
        titles.forEach((title, index) => {
          this.renderChart(data, title, tabNames[index], colors[index]);
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
    ["54, 162, 235", "255, 206, 86"],
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
    ["countyCases"],
    ["255, 99, 132"],
    (cells) => {
      return {
        name: cells[0].innerText + "/" + cells[1].innerText,
        values: {[TITLES.CASES]: parseInt(cells[2].innerText.replace(/,/, ''))}
      };
    }
  );
}

function display(tabName) {
  document.querySelectorAll(".tab-pane").forEach(pane => pane.style.display = "none");
  document.getElementById(tabName).style.display = "block";
}

main();