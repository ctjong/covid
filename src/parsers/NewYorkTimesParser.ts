import { CovidData, NameValueCollection, CovidEntry } from "../Types";
import IParser from "./IParser";
import { TAB_NAMES } from "../Constants";

const sourceUrl = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

type SourceEntry = {
  date?: string,
  state?: string,
  county?: string,
  cases: number,
  deaths: number,
}

type SourceData = SourceEntry[]

type SourceDataByDate = {
  [date: string]: { [name: string]: SourceEntry }
}

export default class NYTimesParser implements IParser{
  retrieveData(args: NameValueCollection): Promise<CovidData> {
    return fetch(sourceUrl)
      .then(data => data.text())
      .then(data => this._parseData(this._csvToJson(data) as SourceData));
  }

  _csvToJson(csv: string) {
    const rows = csv.split("\n");
    const headers = rows.shift().split(",");
    const data:NameValueCollection[] = [];
    rows.forEach(row => {
      const entry: NameValueCollection = {};
      const cells = row.split(",");
      headers.forEach((header, index) => {
        entry[header] = header === "cases" || header === "deaths" ? parseInt(cells[index]) : cells[index];
      });
      data.push(entry);
    });
    return data;
  }

  _parseData(srcData: SourceData) {
    const data: CovidData = {
      [TAB_NAMES.stateCases]: { records: [] },
      [TAB_NAMES.stateDeaths]: { records: [] },
      [TAB_NAMES.countyCases]: { records: [] },
      [TAB_NAMES.countyDeaths]: { records: [] },
    };

    const countyDataByDate:SourceDataByDate = {};
    const stateDataByDate:SourceDataByDate = {};
    srcData.forEach(srcEntry => {
      if (!stateDataByDate[srcEntry.date]) {
        stateDataByDate[srcEntry.date] = {};
      }
      if (!stateDataByDate[srcEntry.date][srcEntry.state]) {
        stateDataByDate[srcEntry.date][srcEntry.state] = { ...srcEntry };
      } else {
        const existingEntry = stateDataByDate[srcEntry.date][srcEntry.state]; 
        stateDataByDate[srcEntry.date][srcEntry.state] = { 
          cases: existingEntry.cases + srcEntry.cases,
          deaths: existingEntry.deaths + srcEntry.deaths,
        };
      }

      if (!countyDataByDate[srcEntry.date]) {
        countyDataByDate[srcEntry.date] = {};
      }
      countyDataByDate[srcEntry.date][`${srcEntry.state}/${srcEntry.county}`] = { ...srcEntry };
    });

    Object.keys(countyDataByDate).forEach(date => {
      this._parseRecordsByDate(data, stateDataByDate, date, TAB_NAMES.stateCases, srcEntry => srcEntry.cases);
      this._parseRecordsByDate(data, stateDataByDate, date, TAB_NAMES.stateDeaths, srcEntry => srcEntry.deaths);
      this._parseRecordsByDate(data, countyDataByDate, date, TAB_NAMES.countyCases, srcEntry => srcEntry.cases);
      this._parseRecordsByDate(data, countyDataByDate, date, TAB_NAMES.countyDeaths, srcEntry => srcEntry.deaths);
    });

    return data;
  }

  _parseRecordsByDate(
    data:CovidData, 
    srcDataByDate:SourceDataByDate,
    date:string,
    tabName:string,
    valueRetriever: (srcEntry: SourceEntry) => number
  ) {
    const entries:CovidEntry[] = Object.keys(srcDataByDate[date]).map(name => ({
      name,
      value: valueRetriever(srcDataByDate[date][name])
    })).filter((entry:CovidEntry) => entry.value || entry.value === 0);
    if (entries.length > 0) {
      data[tabName].records.push({ date, entries });
    }
  }

  _getDateString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}