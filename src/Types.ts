export type NameValueCollection = {[key:string]:any};

export type CovidEntry = {
  name: string,
  value: number
}

export type CovidRecord = {
  date: string,
  entries: CovidEntry[]
}

export type CovidData = {
  [tabName:string]: {
    updateTime: string
    records: CovidRecord[]
  }
}

export type ChartData = {
  labels: string[],
  total: number,
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number,
  }[]
}