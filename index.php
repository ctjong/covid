<?php 
$newsContent = file_get_contents("https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html");
$newsContent = str_replace("<div id=\"app\">", "<div id=\"app\" style=\"display:none\">", $newsContent);
$newsContent = str_replace("</body>", "", $newsContent);
$newsContent = str_replace("</html>", "", $newsContent);
echo $newsContent;
?>

<div style="text-align:center">
  <div class="updated-time"></div>
  <div>Source: <a target="_blank" href="https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html">New York Times</a></div>
</div>


<h2>Number of cases by states</h2>
<canvas id="stateCases" width="2000" height="2000"></canvas>

<h2>Number of deaths by states</h2>
<canvas id="stateDeaths" width="2000" height="2000"></canvas>

<h2>Number of cases by counties</h2>
<canvas id="counties" width="2000" height="4000"></canvas>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
<script src="index.js"></script>
</body>
</html>