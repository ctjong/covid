import {
  NameValueCollection
} from "./Types";

export const DATA_SOURCE = {
  NYTIMES: "nytimes",
}

export const TAB_NAMES = {
  stateCases: "stateCases",
  stateDeaths: "stateDeaths",
  countyCases: "countyCases",
}

export const TAB_CONFIG:NameValueCollection = {
  [TAB_NAMES.stateCases]: {
    title: "Number of cases in the US by states",
    buttonText: "Number of cases in the US by states",
    buttonClass: "btn-primary",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by states",
    color: "54, 162, 235",
    timeClass: "nytimes-time",
  },
  [TAB_NAMES.stateDeaths]: {
    title: "Number of deaths in the US by states",
    buttonText: "Number of deaths in the US by states",
    buttonClass: "btn-warning",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of deaths by states",
    color: "255, 206, 86",
    timeClass: "nytimes-time",
  },
  [TAB_NAMES.countyCases]: {
    title: "Number of cases in the US by counties (only showing the top 100)",
    buttonText: "Number of cases in the US by counties",
    buttonClass: "btn-danger",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by counties",
    color: "255, 99, 132",
    timeClass: "nytimes-time",
  },
}

export const DATA_RETRIEVAL_CONFIG = [
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-1k3kd4i",
      targetTabNames: [
        TAB_NAMES.stateCases,
        TAB_NAMES.stateDeaths,
      ],
    }
  },
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-ffcf53",
      targetTabNames: [
        TAB_NAMES.countyCases,
      ],
    }
  }
];