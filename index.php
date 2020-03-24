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

<button type="button" class="btn btn-primary" onClick="display('cases-by-states')">Number of cases by states</button>
<button type="button" class="btn btn-warning" onClick="display('deaths-by-states')">Number of deaths by states</button>
<button type="button" class="btn btn-danger" onClick="display('cases-by-counties')">Number of cases by counties</button>

<div id="cases-by-states" class="tab-pane">
  <h2>Number of cases by states</h2>
  <canvas id="stateCases" width="2000" height="1000"></canvas>
</div>

<div id="deaths-by-states" class="tab-pane" style="display:none">
  <h2>Number of deaths by states</h2>
  <canvas id="stateDeaths" width="2000" height="1000"></canvas>
</div>

<div id="cases-by-counties" class="tab-pane" style="display:none">
  <h2>Number of cases by counties</h2>
  <canvas id="counties" width="2000" height="2000"></canvas>
</div>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>
<script src="index.js"></script>
</body>
</html>