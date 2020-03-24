import {
  NameValueCollection
} from "./Types";

export const DATA_SOURCE = {
  NYTIMES: "nytimes",
  JOHNHOPKINS: "johnhopkins",
}

export const TAB_NAMES = {
  stateCases: "stateCases",
  stateDeaths: "stateDeaths",
  countyCases: "countyCases",
  countryCases: "countryCases",
  countryDeaths: "countryCases",
  countryRecovereds: "countryRecovereds",
}

export const TAB_CONFIG:NameValueCollection = {
  [TAB_NAMES.stateCases]: {
    title: "Number of cases in the US by states",
    buttonText: "Number of cases in the US by states",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by states",
    color: "54, 162, 235",
    timeClass: "nytimes-time",
    timeline: false,
  },
  [TAB_NAMES.stateDeaths]: {
    title: "Number of deaths in the US by states",
    buttonText: "Number of deaths in the US by states",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of deaths by states",
    color: "255, 206, 86",
    timeClass: "nytimes-time",
    timeline: false,
  },
  [TAB_NAMES.countyCases]: {
    title: "Number of cases in the US by counties (only showing the top 100)",
    buttonText: "Number of cases in the US by counties",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by counties",
    color: "255, 99, 132",
    timeClass: "nytimes-time",
    timeline: false,
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
  },
  // {
  //   dataSource: DATA_SOURCE.JOHNHOPKINS,
  //   args: {
  //     targetTabNames: [
  //       TAB_NAMES.countryCases,
  //       TAB_NAMES.countryDeaths,
  //       TAB_NAMES.countryRecovereds,
  //     ],
  //   }
  // },
];