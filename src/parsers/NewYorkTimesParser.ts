import { CovidData, NameValueCollection, CovidEntry } from "../Types";
import IParser from "./IParser";
import { TAB_NAMES } from "../Constants";

const sourceUrl = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

type SourceEntry = {
  date?: string,
  state?: string,
  county?: string,
  cases: string,
  deaths: string,
}

type SourceData = SourceEntry[]

type SourceDataByDate = {
  [date: string]: SourceEntry[]
}

export default class NYTimesParser implements IParser{
  retrieveData(args: NameValueCollection): Promise<CovidData> {
    return new Promise(async resolve => {
      fetch(sourceUrl)
        .then(data => data.text())
        .then(data => resolve(this._parseData(this._csvToJson(data) as SourceData)));
    });
  }

  _csvToJson(csv: string) {
    const rows = csv.split("\n");
    const headers = rows.shift().split(",");
    const data:NameValueCollection[] = [];
    rows.forEach(row => {
      const entry: NameValueCollection = {};
      const cells = row.split(",");
      headers.forEach((header, index) => {
        entry[header] = cells[index];
      });
      data.push(entry);
    });
    return data;
  }

  _parseData(srcData: SourceData) {
    const updateTime = `Last updated: ${this._getDateString(new Date())}`;
    const data: CovidData = {
      [TAB_NAMES.countyCases]: { updateTime, records: [] },
      [TAB_NAMES.countyDeaths]: { updateTime, records: [] },
    };

    const srcDataByDate:SourceDataByDate = {};
    srcData.forEach(srcEntry => {
      if (!srcDataByDate[srcEntry.date]) {
        srcDataByDate[srcEntry.date] = [];
      }
      srcDataByDate[srcEntry.date].push({ ...srcEntry });
    });

    Object.keys(srcDataByDate).forEach(date => {
      this._parseRecordsByDate(data, srcDataByDate, date, TAB_NAMES.countyCases, srcEntry => srcEntry.cases);
      this._parseRecordsByDate(data, srcDataByDate, date, TAB_NAMES.countyDeaths, srcEntry => srcEntry.deaths);
    });

    return data;
  }

  _parseRecordsByDate(
    data:CovidData, 
    srcDataByDate:SourceDataByDate,
    date:string,
    tabName:string,
    valueRetriever: (srcEntry: SourceEntry) => string
  ) {
    const entries:CovidEntry[] = srcDataByDate[date].map(srcEntry => ({
      name: `${srcEntry.state}/${srcEntry.county}`,
      value: parseInt(valueRetriever(srcEntry))
    })).filter((entry:CovidEntry) => entry.value || entry.value === 0);
    if (entries.length > 0) {
      data[tabName].records.push({ date, entries });
    }
  }

  _getDateString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}