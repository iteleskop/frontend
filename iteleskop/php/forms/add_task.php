<?php

require_once("../config.php");

require_once("../classes/AddTask.php");

// Create new instance of the AddTask class.
$x = new AddTask();

// Get the data from POST or GET. If there are any mandatory fields missing,
// failure() will be called with specified parameters and the script will
// terminate.

$data = $x->getData();

// Check if the data is correct.
$x->validate($data);

// Insert the data into DB.
$x->insert($data);

?>
