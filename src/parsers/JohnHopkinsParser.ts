import { CovidData, NameValueCollection } from "../Types";
import IParser from "./IParser";

const sourceUrl = "https://pomber.github.io/covid19/timeseries.json";

export default class JohnHopkinsParser implements IParser {
  retrieveData(args: NameValueCollection): Promise<CovidData> {
    return new Promise(async resolve => {
      fetch(sourceUrl)
        .then(data => data.json())
        .then(data => {
          Object.keys(data).forEach(country => {
            
          });
        });
    });
  }
}