import { CovidData, NameValueCollection, CovidRecord } from "../Types";
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
    const updateTime = `Update ${this._getDateString(new Date())}`;
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
      data[TAB_NAMES.countryCases].records.push({
        date,
        entries: recordsByDate[date].map((srcRecord:any) => ({
          name: srcRecord.country,
          value: srcRecord.confirmed
        }))
      });
      data[TAB_NAMES.countryDeaths].records.push({
        date,
        entries: recordsByDate[date].map((srcRecord:any) => ({
          name: srcRecord.country,
          value: srcRecord.deaths
        }))
      });
      data[TAB_NAMES.countryRecovereds].records.push({
        date,
        entries: recordsByDate[date].map((srcRecord:any) => ({
          name: srcRecord.country,
          value: srcRecord.recovered
        }))
      });
    });

    return data;
  }

  _getDateString(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}