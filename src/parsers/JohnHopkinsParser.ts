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

type WorldometerEntry = {
  TotalCases: string,
  TotalDeaths: string,
  TotalRecovered: string,
  Country: string,
}

type WorldometerData = {
  reports: { table: WorldometerEntry[][] }[]
}

const WorldometerCountryMap: {[key:string]: string} = {
  "USA": "US",
  "S. Korea": "Korea, South",
  "UK": "United Kingdom",
}

export default class JohnHopkinsParser implements IParser {
  retrievalPromise: Promise<CovidData>;

  retrieveData(args: NameValueCollection): Promise<CovidData> {
    if (!this.retrievalPromise) {
      this.retrievalPromise = new Promise<CovidData>(async resolve => {
        const jhData = await fetch(sourceUrl)
          .then(data => data.json())
          .then(data => this._parseData(data));
        const mergedData = await fetch(worldometerUrl)
          .then(data => data.json())
          .then(data => this._mergeWomData(jhData, data as WorldometerData));
        resolve(mergedData);
      });
    }
    return this.retrievalPromise;
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

  _mergeWomData(jhData: CovidData, womData: WorldometerData): CovidData {
        console.log(womData);
        const womEntries = womData.reports[0].table[0].filter(entry => entry.Country !== "Total:");
    this._mergeWomEntries(jhData, womEntries, "countryCases", womEntry => womEntry.TotalCases);
    this._mergeWomEntries(jhData, womEntries, "countryDeaths", womEntry => womEntry.TotalDeaths);
    this._mergeWomEntries(jhData, womEntries, "countryRecovereds", womEntry => womEntry.TotalRecovered);
    return jhData;
  }

  _mergeWomEntries(jhData: CovidData, womEntries: WorldometerEntry[], tabName: string, valueRetriever: (womEntry: WorldometerEntry) => string) {
    const date = this._getDateString(new Date())
    const lastRecord = jhData[tabName].records[jhData[tabName].records.length - 1];
    if (lastRecord.date === date) {
      jhData[tabName].records.splice(jhData[tabName].records.length - 1, 1);
    }

    jhData[tabName].records.push({
      date,
      entries: womEntries.filter(womEntry => {
        return !!valueRetriever(womEntry) && womEntry.Country !== "World";
      }).map(womEntry => ({
        name: WorldometerCountryMap[womEntry.Country] || womEntry.Country,
        value: parseInt(valueRetriever(womEntry).replace(/,/g, "")),
      }))
    });
  }

  _getDateString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}