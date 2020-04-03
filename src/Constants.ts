import {
  NameValueCollection
} from "./Types";

export const CHART_TYPES = {
  BAR: "bar",
  LINE: "line",
}

export const LINE_CHART_SCALES = {
  LINEAR: "linear",
  LOG: "logarithmic",
}

export const DATA_SOURCE = {
  NYTIMES: "nytimes",
  JOHNHOPKINS: "johnhopkins",
}

export const TAB_NAMES = {
  countryCases: "countryCases",
  countryDeaths: "countryDeaths",
  countryRecovereds: "countryRecovereds",
  stateCases: "stateCases",
  stateDeaths: "stateDeaths",
  countyCases: "countyCases",
  countyDeaths: "countyDeaths",
}

export const TAB_CONFIG:NameValueCollection = {
  [TAB_NAMES.countryCases]: {
    title: "Number of cases in the world by country",
    buttonText: "Cases by country",
    sources: [
      { link: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6", text: "John Hopkins" },
      { link: "https://www.worldometers.info/coronavirus/", text: "Worldometer" },
    ],
    chartLabel: "number of cases by country",
    timeline: true,
  },
  [TAB_NAMES.countryDeaths]: {
    title: "Number of deaths in the world by country",
    buttonText: "Deaths by country",
    sources: [
      { link: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6", text: "John Hopkins" },
      { link: "https://www.worldometers.info/coronavirus/", text: "Worldometer" },
    ],
    chartLabel: "number of deaths by country",
    timeline: true,
  },
  [TAB_NAMES.countryRecovereds]: {
    title: "Number of recovered cases in the world by country",
    buttonText: "Recovered cases by country",
    sources: [
      { link: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6", text: "John Hopkins" },
      { link: "https://www.worldometers.info/coronavirus/", text: "Worldometer" },
    ],
    chartLabel: "number of recovered cases by country",
    timeline: true,
  },
  [TAB_NAMES.stateCases]: {
    title: "Number of cases in the US by state",
    buttonText: "US cases by state",
    sources: [
      { link: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html", text: "New York Times" },
    ],
    chartLabel: "number of cases by state",
    timeline: true,
  },
  [TAB_NAMES.stateDeaths]: {
    title: "Number of deaths in the US by state",
    buttonText: "US deaths by state",
    sources: [
      { link: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html", text: "New York Times" },
    ],
    chartLabel: "number of cases by state",
    timeline: true,
  },
  [TAB_NAMES.countyCases]: {
    title: "Number of cases in the US by county (top 100)",
    buttonText: "US cases by county",
    sources: [
      { link: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html", text: "New York Times" },
    ],
    chartLabel: "number of cases by county",
    timeline: true,
  },
  [TAB_NAMES.countyDeaths]: {
    title: "Number of deaths in the US by county (top 100)",
    buttonText: "US deaths by county",
    sources: [
      { link: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html", text: "New York Times" },
    ],
    chartLabel: "number of cases by county",
    timeline: true,
  },
}

export const DATA_RETRIEVAL_CONFIG = [
  {
    dataSource: DATA_SOURCE.JOHNHOPKINS,
    args: {}
  },
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {}
  },
];