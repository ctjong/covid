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
    records: CovidRecord[]
  }
}

export type ChartConfig = {
  labels: string[],
  barLabels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number,
  }[]
}

export type ChartData = {
  barTotal: number,
  barConfig: ChartConfig,
  lineConfig: ChartConfig,
}