import { CovidData, NameValueCollection } from "./Types";

export default interface Parser {
  retrieveData(args: NameValueCollection): Promise<CovidData>;
}