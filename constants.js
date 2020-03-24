const TITLES = {
  CASES: "number of cases",
  DEATHS: "number of deaths",
}

const DATA_SOURCE = {
  NYTIMES: "nytimes",
}

const DATA_RETRIEVAL_CONFIG = [
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-1k3kd4i",
      cellsParsers: [
        {
          tabName: "stateCases",
          parser: cells => ({
            name: cells[0].innerText,
            value: parseInt(cells[1].innerText.replace(/,/, '')),
          })
        },
        {
          tabName: "stateDeaths",
          parser: cells => ({
            name: cells[0].innerText,
            value: parseInt(cells[2].innerText.replace(/,/, '')),
          })
        }
      ]
    }
  },
  {
    dataSource: DATA_SOURCE.NYTIMES,
    args: {
      tableClass: "svelte-ffcf53",
      cellsParsers: [
        {
          tabName: "countyCases",
          parser: cells => ({
            name: cells[0].innerText + "/" + cells[1].innerText,
            value: parseInt(cells[2].innerText.replace(/,/, ''))
          })
        }
      ]
    }
  }
];

const TAB_CONFIG = {
  "stateCases": {
    title: TITLES.CASES,
    color: "54, 162, 235"
  },
  "stateDeaths": {
    title: TITLES.DEATHS,
    color: "255, 206, 86"
  },
  "countyCases": {
    title: TITLES.CASES,
    color: "255, 99, 132"
  },
}