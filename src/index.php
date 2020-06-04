<?php
  session_start();

  if(!empty($_SESSION["userId"])) {
    echo "Yay! userId found";
  } else {
    echo "No userId";
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mood Tracker by Ricard Torres</title>
  <link rel="stylesheet" href="./css/main.css?ver=1.0.0">
</head>
<body>
  <header class="header">
    <h1>How are you feeling today?</h1>
    <h2 class="today"></h2>
  </header>
  <main>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
    <div class="icon">
      <img src="./assets/icons/007-tongue-4.svg" alt="">
    </div>
  </main>
  <footer class="footer">
    Made by <a href="https://ricard.dev">Ricard Torres</a>
  </footer>
  <script src="./js/bundle.js?ver=1.0.0"></script>
</body>
</html>