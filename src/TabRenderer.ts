import { CovidData, NameValueCollection } from "./Types";
import { TAB_CONFIG } from "./Constants";

export default class TabRenderer {
  renderTab(allData: CovidData, allCharts:NameValueCollection, tabName:string, searchKeyword?:string) {
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