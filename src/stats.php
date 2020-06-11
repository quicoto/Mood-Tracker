<?php

  // https://github.com/chartjs/Chart.js

  session_start();

  if(!empty($_SESSION["userId"])) {
    header("Location: ./");
  }

  $meta_title = "Stats";
?>
<?php include ('./templates/head.php'); ?>
  <header class="header">
    <h1 class="headerWithIcon">
      <img src="./assets/icons/051.svg" class="default-icon d-inline-block" alt="Icon">
      <span>
        Howdy!
      </span>
    </h1>
  </header>
  <main class="login">
    <div class="container">
        <div class="card">
          <form action="./api/auth.php" method="post">
          <?php
            if ($_GET['error']) { ?>
            <div class="input-container input-container--error">
              <img class="default-icon" src="./assets/icons/081.svg" alt="">
              There was a problem with your username or password.
            </div>
          <?php
            }
          ?>
            <div class="input-container">
              <input type="text" name="username" id="username" required="required" />
              <label for="username">Username</label>
              <div class="bar"></div>
            </div>
            <div class="input-container">
              <input type="password" name="password" id="password" required="required" />
              <label for="password">Password</label>
              <div class="bar"></div>
            </div>
            <div class="button-container">
              <button type="submit"><span>Go</span></button>
            </div>
          </form>
        </div>
    </div>
  </main>
<?php include ('./templates/footer.php'); ?>
<?php include ('./templates/foot.php'); ?>