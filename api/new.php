<?php
session_start();

$request = $_SERVER['REQUEST_METHOD'];
$output = array();

if (!$_SESSION['userId']) {
  http_response_code(401);
  die('User is not logged in');
}

if ($request == 'POST' && $_SESSION['userId']) {
  include('../../connection.php'); // This file is not in git repo

  $POST = file_get_contents("php://input");
  $POST = json_decode($POST, true);

  $type = $mysqli->real_escape_string(intval($POST['type']));

  // Check if we've already added the mood for today
  $todays_mood_query = 'SELECT * FROM moods where user = '.$_SESSION['userId'].' AND  date = CURDATE()';

  $result = $mysqli->query($todays_mood_query);
  if(!$result){
    http_response_code(500);
    die('There was an error running the query.');
  }

  $rows = $result->fetch_assoc();

  if ($rows) {
    // Found, let's update it
    $query = "UPDATE `moods` SET `type` = '". $type ."' WHERE user = ".$_SESSION['userId']." AND date = CURDATE()";
  } else {
     $query = "INSERT INTO `moods` (`id`, `type`, `user`, `date`) VALUES (NULL, '".$type."', '".$_SESSION['userId']."', CURDATE());";
  }

  $mysqli->query($query);

  header('Content-Type: application/json; charset=UTF-8');
  http_response_code(200);
  echo json_encode($output);
  exit(0);
}

