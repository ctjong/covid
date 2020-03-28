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
  countryDeaths: "countryDeaths",
  countryRecovereds: "countryRecovereds",
}

export const TAB_CONFIG:NameValueCollection = {
  [TAB_NAMES.stateCases]: {
    title: "Number of cases in the US by state",
    buttonText: "US cases by state",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by state",
    timeline: false,
  },
  [TAB_NAMES.stateDeaths]: {
    title: "Number of deaths in the US by state",
    buttonText: "US deaths by state",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of deaths by state",
    timeline: false,
  },
  [TAB_NAMES.countyCases]: {
    title: "Number of cases in the US by county (top 100)",
    buttonText: "US cases by county",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by county",
    timeline: false,
  },
  [TAB_NAMES.countryCases]: {
    title: "Number of cases in the world by country",
    buttonText: "Cases by country",
    srcLink: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",
    srcText: "John Hopkins",
    chartLabel: "number of cases by country",
    timeline: true,
  },
  [TAB_NAMES.countryDeaths]: {
    title: "Number of deaths in the world by country",
    buttonText: "Deaths by country",
    srcLink: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",
    srcText: "John Hopkins",
    chartLabel: "number of deaths by country",
    timeline: true,
  },
  [TAB_NAMES.countryRecovereds]: {
    title: "Number of recovered people in the world by country",
    buttonText: "Recovered people by country",
    srcLink: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",
    srcText: "John Hopkins",
    chartLabel: "number of recovered people by country",
    timeline: true,
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
  {
    dataSource: DATA_SOURCE.JOHNHOPKINS,
    args: {
      targetTabNames: [
        TAB_NAMES.countryCases,
        TAB_NAMES.countryDeaths,
        TAB_NAMES.countryRecovereds,
      ],
    }
  },
];