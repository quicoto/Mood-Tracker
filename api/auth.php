<?php
/**
 * Auth the username / password.
 * @author Ricard Torres
 */

$request = $_SERVER['REQUEST_METHOD'];

function redirect() {
  header("Location: ../");
}

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
  redirect();
}

if (!$_POST['username'] || !$_POST['password']) {
  redirect();
}

if ($_POST['username'] === "" || $_POST['password'] === "") {
  redirect();
}

include('../../connection.php'); // This file is not in git repo

// Check if the user exists
$check_user = 'SELECT * FROM users where username = "' . $mysqli->real_escape_string($_POST['username']) . '" LIMIT 0,1';

$result = $mysqli->query($check_user);
if(!$result){
  // No user found
  echo "Error";
}

$rows = $result->fetch_assoc();

if (!$rows) {
  header("Location: ../login.php?error=true");
}

// Check if the password matches
if (password_verify($_POST['password'], $rows['password'])) {
  session_start();
  $_SESSION["userId"] = $rows['id'];
  redirect();
} else {
  header("Location: ../login.php?error=true&verufy");
}