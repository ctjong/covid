export type NameValueCollection = {[key:string]:any};

export type CovidData = {
  [tabName:string]: {
    updateTime: string
    entries: { name:string, value: number }[]
  }
}
