<?php 
$titles = array(
  "countryCases" => "Number of cases in the world by country",
  "countryDeaths" => "Number of deaths in the world by country",
  "countryRecovereds" => "Number of recovered cases in the world by country",
  "stateCases" => "Number of cases in the US by state",
  "stateDeaths" => "Number of deaths in the US by state",
  "countyCases" => "Number of cases in the US by county (top 100)",
  "countyDeaths" => "Number of deaths in the US by county (top 100)",
);

$content = file_get_contents("index.html");
$tabName = $_GET["chart"];

$title = $titles[$tabName];
if (!$title) {
  $title = "Covid-19 Statistics";
} else {
  $title = "Covid-19 Statistics | " . $title;
}

$content = str_replace("%TITLE%", $title, $content);
echo $content;
?>