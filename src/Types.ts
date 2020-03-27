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
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    borderWidth: number
  }[]
}

/*
{
      labels: chartEntries.map((e) => { return e.name } ),
      datasets: [{
          label: tabConfig.chartLabel,
          data: chartEntries.map((e) => { return e.value } ),
          backgroundColor: `rgba(${tabConfig.color}, 0.2)`,
          borderColor: `rgba(${tabConfig.color}, 1)`,
          borderWidth: 1,
      }]
    }*/