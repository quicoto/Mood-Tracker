<?php
  session_start();

  if(empty($_SESSION["userId"])) {
    header("Location: ./login.php");
  }

  include('../connection.php'); // This file is not in git repo

  $get_user_query = 'SELECT * FROM users where id = "' . $_SESSION['userId'] . '" LIMIT 0,1';

  if(!$result = $mysqli->query($get_user_query)){
    echo "<h3>There was an error, sorry<h3>";
    die();
  }

  $rows = $result->fetch_assoc();
  $username = $rows['username'];

  // Check if we have an entry for today
  $todays_mood_query = 'SELECT * FROM moods where user = '.$_SESSION['userId'].' AND  date = CURDATE()';

  if($result = $mysqli->query($todays_mood_query)){
    $rows = $result->fetch_assoc();
    $today_mood = $rows['type'];
  }
?>
<?php include ('./templates/head.php'); ?>
<div class="loadingContainer" hidden>
  <img src="./assets/icons/005.svg" alt="Loading">
</div>
<header class="header">
  <h1>How are you feeling today?</h1>
  <h2 class="today"></h2>
</header>
<main>
<?php
  // Query the mood types
  $icons_query = 'SELECT * FROM types';

  if(!$result = $mysqli->query($icons_query)){
    // No user found
    echo "<h3>There was an error, sorry.</h3>";
    die();
  }

  while ($row = $result->fetch_assoc()) {
    $selected = '';
    if ($today_mood && $row['id'] === $today_mood) {
      $selected = 'selected';
    }
  ?>
    <div class="icon <?=$selected?>" data-type="<?=$row['id']?>">
      <img src="./assets/icons/<?=$row['icon']?>.svg" alt="<?=$row['name']?>" title="I'm feeling <?=$row['name']?>">
    </div>
<?php
  }
?>
</main>
<?php include ('./templates/footer.php'); ?>
<?php include ('./templates/foot.php'); ?>