import { CovidData, NameValueCollection, CovidEntry } from "../Types";
import IParser from "./IParser";
import { TAB_NAMES } from "../Constants";

const sourceUrl = "https://pomber.github.io/covid19/timeseries.json";
const worldometerUrl = "https://covid19-server.chrismichael.now.sh/api/v1/AllReports";

type SourceEntry = {
  date?: string,
  country?: string,
  confirmed: number,
  deaths: number,
  recovered: number,
}

type SourceData = {
  [country: string]: SourceEntry[]
}

type SourceDataByDate = {
  [date: string]: SourceEntry[]
}

export default class JohnHopkinsParser implements IParser {
  retrieveData(args: NameValueCollection): Promise<CovidData> {
    return fetch(sourceUrl)
      .then(data => data.json())
      .then(data => this._parseData(data));
  }

  _parseData(srcData: SourceData) {
    const data: CovidData = {
      [TAB_NAMES.countryCases]: { records: [] },
      [TAB_NAMES.countryDeaths]: { records: [] },
      [TAB_NAMES.countryRecovereds]: { records: [] },
    };

    const srcDataByDate:SourceDataByDate = {};
    Object.keys(srcData).forEach(country => {
      const srcEntry = srcData[country];
      srcEntry.forEach(srcEntry => {
        if (!srcDataByDate[srcEntry.date]) {
          srcDataByDate[srcEntry.date] = [];
        }
        srcDataByDate[srcEntry.date].push({ country, ...srcEntry });
      });
    });

    Object.keys(srcDataByDate).forEach(date => {
      this._parseRecordsByDate(data, srcDataByDate, date, TAB_NAMES.countryCases, srcEntry => srcEntry.confirmed);
      this._parseRecordsByDate(data, srcDataByDate, date, TAB_NAMES.countryDeaths, srcEntry => srcEntry.deaths);
      this._parseRecordsByDate(data, srcDataByDate, date, TAB_NAMES.countryRecovereds, srcEntry => srcEntry.recovered);
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
    const entries:CovidEntry[] = srcDataByDate[date].map(srcEntry => ({
      name: srcEntry.country,
      value: valueRetriever(srcEntry)
    })).filter((entry:CovidEntry) => entry.value || entry.value === 0);
    if (entries.length > 0) {
      data[tabName].records.push({ date, entries });
    }
  }

  _getDateString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}