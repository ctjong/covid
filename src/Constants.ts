import {
  NameValueCollection
} from "./Types";

export const CHART_LABELS = {
  CASES: "number of cases",
  DEATHS: "number of deaths",
}

export const DATA_SOURCE = {
  NYTIMES: "nytimes",
}

export const TAB_CONFIG:NameValueCollection = {
  "stateCases": {
    title: "Number of cases in the US by states",
    button: "Number of cases in the US by states",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: CHART_LABELS.CASES,
    color: "54, 162, 235",
    timeClass: "nytimes-time",
  },
  "stateDeaths": {
    title: "Number of deaths in the US by states",
    button: "Number of deaths in the US by states",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: CHART_LABELS.DEATHS,
    color: "255, 206, 86",
    timeClass: "nytimes-time",
  },
  "countyCases": {
    title: "Number of cases in the US by counties (only showing the top 100)",
    button: "Number of cases in the US by counties",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: CHART_LABELS.CASES,
    color: "255, 99, 132",
    timeClass: "nytimes-time",
  },
}

export const DATA_RETRIEVAL_CONFIG = [
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-1k3kd4i",
      cellsParsers: [
        {
          tabName: "stateCases",
          parser: (cells: HTMLElement[]) => ({
            name: cells[0].innerText,
            value: parseInt(cells[1].innerText.replace(/,/, '')),
          })
        },
        {
          tabName: "stateDeaths",
          parser: (cells: HTMLElement[]) => ({
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
          parser: (cells: HTMLElement[]) => ({
            name: cells[0].innerText + "/" + cells[1].innerText,
            value: parseInt(cells[2].innerText.replace(/,/, ''))
          })
        }
      ]
    }
  }
];