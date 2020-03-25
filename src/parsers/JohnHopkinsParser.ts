import { CovidData, NameValueCollection, CovidRecord, CovidEntry } from "../Types";
import IParser from "./IParser";
import { TAB_NAMES } from "../Constants";

const sourceUrl = "https://pomber.github.io/covid19/timeseries.json";

export default class JohnHopkinsParser implements IParser {
  retrieveData(args: NameValueCollection): Promise<CovidData> {
    return new Promise(async resolve => {
      fetch(sourceUrl)
        .then(data => data.json())
        .then(data => resolve(this._parseData(data)));
    });
  }

  _parseData(srcData: any) {
    const updateTime = `Last updated: ${this._getDateString(new Date())}`;
    const data: CovidData = {
      [TAB_NAMES.countryCases]: { updateTime, records: [] },
      [TAB_NAMES.countryDeaths]: { updateTime, records: [] },
      [TAB_NAMES.countryRecovereds]: { updateTime, records: [] },
    };

    const recordsByDate:NameValueCollection = {};
    Object.keys(srcData).forEach(country => {
      const countryData = srcData[country];
      countryData.forEach((countryRecord: any) => {
        if (!recordsByDate[countryRecord.date]) {
          recordsByDate[countryRecord.date] = [];
        }
        recordsByDate[countryRecord.date].push({ ...countryRecord, country });
      });
    });

    Object.keys(recordsByDate).forEach(date => {
      this._parseRecordsByDate(data, recordsByDate, date, TAB_NAMES.countryCases, "confirmed");
      this._parseRecordsByDate(data, recordsByDate, date, TAB_NAMES.countryDeaths, "deaths");
      this._parseRecordsByDate(data, recordsByDate, date, TAB_NAMES.countryRecovereds, "recovered");
    });

    return data;
  }

  _parseRecordsByDate(data:CovidData, recordsByDate:NameValueCollection, date:string, tabName:string, fieldName:string) {
    const entries:CovidEntry[] = recordsByDate[date].map((srcRecord:any) => ({
      name: srcRecord.country,
      value: srcRecord[fieldName]
    })).filter((entry:CovidEntry) => entry.value || entry.value === 0);
    if (entries.length > 0) {
      data[tabName].records.push({ date, entries });
    }
  }

  _getDateString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}