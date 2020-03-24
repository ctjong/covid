import { CovidData, NameValueCollection } from "../Types";
import IParser from "./IParser";
import { TAB_NAMES } from "../Constants";

const dataParsers = {
  [TAB_NAMES.stateCases]: (cells: NodeListOf<HTMLTableDataCellElement>) => ({
    name: cells[0].innerText,
    value: parseInt(cells[1].innerText.replace(/,/, '')),
  }),
  [TAB_NAMES.stateDeaths]: (cells: NodeListOf<HTMLTableDataCellElement>) => ({
    name: cells[0].innerText,
    value: parseInt(cells[2].innerText.replace(/,/, '')),
  }),
  [TAB_NAMES.countyCases]: (cells: NodeListOf<HTMLTableDataCellElement>) => ({
    name: cells[0].innerText + "/" + cells[1].innerText,
    value: parseInt(cells[2].innerText.replace(/,/, ''))
  }),
}

export default class NYTimesParser implements IParser{
  retrieveData(args: NameValueCollection): Promise<CovidData> {
    const data: CovidData = {};
    args.targetTabNames.forEach((tabName:string) => {
      data[tabName] = { 
        updateTime: document.querySelector(".css-wcxsge").innerHTML.replace("<!-- -->", ""),
        entries: []
      };
    });
    return new Promise(resolve => {
      this._loadSourceTable(args.tableClass).then(() => {
        this._parseSourceTable(data, args.tableClass, args.targetTabNames).then(() => {
          resolve(data);
        });
      });
    })
  }

  _loadSourceTable(tableClass: string) {
    return new Promise((resolve) => {
      const timer = setInterval(() => { 
        let button = document.querySelector(`button.${tableClass}`) as HTMLButtonElement;
        if (button) {
          clearInterval(timer);
          button.click();
          resolve();
        }
      }, 1000);
    });
  }
  
  _parseSourceTable(data: CovidData, tableClass: string, targetTabNames: string[]) {
    return new Promise((resolve) => {
      const timer = setInterval(() => { 
        const rows = document.querySelectorAll(`tbody tr.${tableClass}`);
        if (rows.length > 10) {
          clearInterval(timer);
          rows.forEach((row) => {
            targetTabNames.forEach(tabName => {
              const entry = dataParsers[tabName](row.querySelectorAll("td"));
              data[tabName].entries.push(entry);
            });
          });
          resolve();
        }
      }, 1000);
    });
  }
}