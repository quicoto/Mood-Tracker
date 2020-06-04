<?php
/**
 * Auth the username / password.
 * @author Ricard Torres
 */

// Get the current request
$request = $_SERVER['REQUEST_METHOD'];
$output = array();

include('../connection.php'); // This file is not in git repo

if (password_verify($submited_password, $db_password)) {
  // Password correct
};