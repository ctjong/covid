<?php 
$newsContent = file_get_contents("https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html");
$newsContent = str_replace("<div id=\"app\">", "<div id=\"app\" style=\"display:none\">", $newsContent);
$newsContent = str_replace("</body>", "", $newsContent);
$newsContent = str_replace("</html>", "", $newsContent);
echo $newsContent;
?>

<div style="margin-bottom: 40px">
  <div class="updated-time"></div>
  <div>Source: <a target="_blank" href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">New York Times</a></div>
</div>

<button type="button" class="btn btn-primary" onClick="display('stateCases')">Number of cases by states</button>
<button type="button" class="btn btn-warning" onClick="display('stateDeaths')">Number of deaths by states</button>
<button type="button" class="btn btn-danger" onClick="display('countyCases')">Number of cases by counties</button>

<div id="stateCases" class="tab-pane">
  <h2>Number of cases by states</h2>
  <div id="stateCases-total"></div>
  <canvas id="stateCases-canvas" width="2000" height="1000"></canvas>
</div>

<div id="stateDeaths" class="tab-pane" style="display:none">
  <h2>Number of deaths by states</h2>
  <div id="stateDeaths-total"></div>
  <canvas id="stateDeaths-canvas" width="2000" height="1000"></canvas>
</div>

<div id="countyCases" class="tab-pane" style="display:none">
  <h2>Number of cases by counties (only showing the top 100)</h2>
  <div id="countyCases-total"></div>
  <canvas id="countyCases-canvas" width="2000" height="2000"></canvas>
</div>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>
<script src="index.js"></script>
</body>
</html>