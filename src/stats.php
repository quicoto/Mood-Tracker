<?php

  // https://github.com/chartjs/Chart.js

  session_start();

  if(empty($_SESSION["userId"])) {
    header("Location: ./login");
  }

  include('../connection.php'); // This file is not in git repo

  $meta_title = "Stats";
?>
<?php include ('./templates/head.php'); ?>
  <script src="./assets/libraries/Chart.min.js"></script>
  <header class="header">
    <h1 class="headerWithIcon">
      <span>
        Stats
      </span>
    </h1>
    <a href="index.php">Home</a>
  </header>
  <main class="stats">
    <?php
      // Check if we have an entry for today
      $all_mood_query = 'SELECT moods.type, types.icon, types.name, COUNT(moods.type) FROM moods INNER JOIN types ON moods.type=types.id where moods.user = '.$_SESSION['userId'].' GROUP BY moods.type';
      $labels = '';
      $data = '';
      $total_count = 0;

      if($result = $mysqli->query($all_mood_query)){
        while ($row = $result->fetch_assoc()) {
          $total_count += $row['COUNT(moods.type)'];
          $data .= $row['COUNT(moods.type)'].",";
          $labels .= "'".$row['name']."',";
        }

        $data = substr($data, 0, -1);
        $labels = substr($labels, 0, -1);
      }
    ?>
    <h2>All time reactions (<?=$total_count?>)</h2>
    <canvas id="allPie" class="allPie"></canvas>
    <script>
      const ctx = document.getElementById('allPie').getContext('2d');
      data = {
        datasets: [{
          data: [<?=$data?>],
          backgroundColor: [
						'#f9ca24',
						'#22a6b3',
						'#eb4d4b',
						'#4834d4',
						'#e056fd',
						'#6ab04c'
          ],
          options: {
            responsive: true
          }
        }],

        labels: [<?=$labels?>]
      };

      const myPieChart = new Chart(ctx, {
          type: 'pie',
          data: data,
      });
    </script>
  </main>
<?php include ('./templates/footer.php'); ?>
<?php include ('./templates/foot.php'); ?>