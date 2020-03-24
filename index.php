<?php
function getContents($sources) {
  $combined = "";
  foreach($sources as $source) {
    $matches = [];
    $content = file_get_contents($source);
    preg_match("/<body[^>]*>(.*?)<\/body>/is", $content, $matches, PREG_OFFSET_CAPTURE);
    $content = $matches[0][0];
    $content = str_replace("<body>", "", $content);
    $content = str_replace("</body>", "", $content);
    $combined .= $content;
  }
  return $combined;
}

$sourceContents = getContents([
  "https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",
]);

?>

<html>
<head>
  <title>Covid-19 statistics</title>
  <meta description="Covid-19 statistics"/>
  <meta charset="utf-8" />
  <link rel="icon" href="build/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <link rel="apple-touch-icon" href="build/logo192.png" />
  <link rel="manifest" href="build/manifest.json" />
</head>

<body style="padding:10px">
  <div style="display:none"><?=$sourceContents?></div>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" type="text/css" href="build/static/css/main.chunk.css" />
  <script type="text/javascript" src="build/static/js/2.chunk.js"></script>
  <script type="text/javascript" src="build/static/js/runtime-main.js"></script>
  <script type="text/javascript" src="build/static/js/main.chunk.js"></script>
</body>
</html>