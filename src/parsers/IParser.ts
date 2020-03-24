import { CovidData, NameValueCollection } from "../Types";

export default interface IParser {
  retrieveData(args: NameValueCollection): Promise<CovidData>;
}