<?php

if($_SESSION["userId"]) {
  $_SESSION["userId"] = "";
  session_destroy();
}

header("Location: ./");