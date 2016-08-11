<?php

require_once("../config.php");

require_once("../classes/Task.php");

// Create new instance of the Task class.
$x = new Task();

// Get the data from POST or GET. If there are any mandatory fields missing,
// failure() will be called with specified parameters and the script will
// terminate.

$data = $x->getData();

// Check if the data is correct.
$result = $x->validateNewTask($data);

if (strlen($result)) {
    printf(json_encode($result));
}

// Insert the data into DB.
$result = $x->insert($data);

printf(json_encode($result));

?>
