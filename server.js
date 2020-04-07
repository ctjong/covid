import * as express from "express";
import * as path from "path";
import * as fs from "fs";

const app = express();

app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use(
  "/asset-manifest.json",
  express.static(path.join(__dirname, "../../asset-manifest.json"))
);
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "../../favicon.ico"))
);
app.use(
  "/manifest.json",
  express.static(path.join(__dirname, "../../manifest.json"))
);
app.use(
  "/service-worker.js",
  express.static(path.join(__dirname, "../../service-worker.js"))
);
app.get("/test1", (req, res) => {
  let index = fs.readFileSync(
    path.join(__dirname, "/index.html"),
    "utf8"
  );
  res.send(index);
});
app.get("/test2", (req, res) => {
  let index = fs.readFileSync(
    path.join(__dirname, "/build/index.html"),
    "utf8"
  );
  res.send(index);
});

const port = process.env.port || 1337;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
