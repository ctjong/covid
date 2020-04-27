const express = require("express");
const fs = require("fs");
const path = require("path");
const url = require("url");
const app = express();

const titles = {
  "countryCases" : "Number of cases in the world by country",
  "countryDeaths" : "Number of deaths in the world by country",
  "countryRecovereds" : "Number of recovered cases in the world by country",
  "stateCases" : "Number of cases in the US by state",
  "stateDeaths" : "Number of deaths in the US by state",
  "countyCases" : "Number of cases in the US by county (top 100)",
  "countyDeaths" : "Number of deaths in the US by county (top 100)",
};

app.use("/static", express.static(path.join(__dirname, "build/static")));
app.use("/asset-manifest.json", express.static(path.join(__dirname, "build/asset-manifest.json")));
app.use("/favicon.ico", express.static(path.join(__dirname, "build/favicon.ico")));
app.use("/manifest.json", express.static(path.join(__dirname, "build/manifest.json")));
app.use("/service-worker.js", express.static(path.join(__dirname, "build/service-worker.js")));

app.get("*", (req, res) => {
  const queryObject = url.parse(req.url,true).query;
  const tabName = queryObject["chart"];
  const tabTitle = titles[tabName] || "Home";
  const title = `Covid-19 Statistics | ${tabTitle}`;
  let index = fs.readFileSync(
    path.join(__dirname, "./build/index.html"),
    "utf8"
  );
  index = index.replace("%TITLE%", title);
  res.send(index);
});

app.listen(1337, () => {
  console.log(`listening on 1337`);
});