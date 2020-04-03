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
  countyCases: "countyCases",
  countyDeaths: "countyDeaths",
  countryCases: "countryCases",
  countryDeaths: "countryDeaths",
  countryRecovereds: "countryRecovereds",
}

export const TAB_CONFIG:NameValueCollection = {
  [TAB_NAMES.countryCases]: {
    title: "Number of cases in the world by country",
    buttonText: "Cases by country",
    srcLink: "https://github.com/pomber/covid19",
    srcText: "John Hopkins",
    chartLabel: "number of cases by country",
    timeline: true,
  },
  [TAB_NAMES.countryDeaths]: {
    title: "Number of deaths in the world by country",
    buttonText: "Deaths by country",
    srcLink: "https://github.com/pomber/covid19",
    srcText: "John Hopkins",
    chartLabel: "number of deaths by country",
    timeline: true,
  },
  [TAB_NAMES.countryRecovereds]: {
    title: "Number of recovered cases in the world by country",
    buttonText: "Recovered cases by country",
    srcLink: "https://github.com/pomber/covid19",
    srcText: "John Hopkins",
    chartLabel: "number of recovered cases by country",
    timeline: true,
  },
  [TAB_NAMES.countyCases]: {
    title: "Number of cases in the US by county (top 100)",
    buttonText: "US cases by county",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by county",
    timeline: true,
  },
  [TAB_NAMES.countyDeaths]: {
    title: "Number of deaths in the US by county (top 100)",
    buttonText: "US deaths by county",
    srcLink: "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
    srcText: "New York Times",
    chartLabel: "number of cases by county",
    timeline: true,
  },
}

export const DATA_RETRIEVAL_CONFIG = [
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
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      targetTabNames: [
        TAB_NAMES.countyCases,
        TAB_NAMES.countyDeaths,
      ],
    }
  },
];