<?php
function getContent($src) {
  $matches = [];
  $content = file_get_contents($src);
  preg_match("/<body[^>]*>(.*?)<\/body>/is", $content, $matches, PREG_OFFSET_CAPTURE);
  $content = $matches[0][0];
  $content = str_replace("<body>", "", $content);
  $content = str_replace("</body>", "", $content);
  return "<div style=\"display:none;\">" . $content . "</div>";
}

$nyTimesContent = getContent("https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html");

?>

<html>
<head>
  <title>Covid-19 statistics</title>
  <meta description="Covid-19 statistics"/>
</head>

<body>

<?=$nyTimesContent?>

<button type="button" class="btn btn-primary" onClick="display('stateCases')">Number of cases in the US by states</button>
<button type="button" class="btn btn-warning" onClick="display('stateDeaths')">Number of deaths in the US by states</button>
<button type="button" class="btn btn-danger" onClick="display('countyCases')">Number of cases in the US by counties</button>

<div id="stateCases" class="tab-pane">
  <h2>Number of cases in the US by states</h2>
  <div>Source: <a target="_blank" href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">New York Times</a></div>
  <div class="nytimes-time"></div>
  <div id="stateCases-total"></div>
  <canvas id="stateCases-canvas" width="2000" height="1000"></canvas>
</div>

<div id="stateDeaths" class="tab-pane" style="display:none">
  <h2>Number of deaths in the US by states</h2>
  <div>Source: <a target="_blank" href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">New York Times</a></div>
  <div class="nytimes-time"></div>
  <div id="stateDeaths-total"></div>
  <canvas id="stateDeaths-canvas" width="2000" height="1000"></canvas>
</div>

<div id="countyCases" class="tab-pane" style="display:none">
  <h2>Number of cases in the US by counties (only showing the top 100)</h2>
  <div>Source: <a target="_blank" href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">New York Times</a></div>
  <div class="nytimes-time"></div>
  <div id="countyCases-total"></div>
  <canvas id="countyCases-canvas" width="2000" height="2000"></canvas>
</div>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>
<script src="index.js"></script>
</body>
</html>