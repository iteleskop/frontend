<?php

 class Tasks {

    private $_db;
    protected $_result;
    public $results;

    public function __construct() {
        global $photon_catcher_host;
        global $photon_catcher_user;
        global $photon_catcher_pass;
        global $photon_catcher_db;

        $this->_db = new mysqli($photon_catcher_host, $photon_catcher_user,
                                $photon_catcher_pass, $photon_catcher_db);

        $_db = $this->_db;

        if ($_db->connect_error) {
            die('Connection Error: ' . $_db->connect_error);
        }

        if (!$_db->set_charset("utf8")) {
            die('Setting charset to utf8 failed: '. $_db->error);
        }

        return $_db;
    }

    public function getResults($params) {
        $_db = $this->_db;

        $_result = $_db->query("SELECT task_id, scope_id, object, ra, decl, tasks.user_id, users.login, exposure, filter,binning, defocus, calibrate, solve, vphot, other_cmd, min_alt, moon_distance, skip_before, skip_after, skip_interval, skip_period_seconds, skip_period_count, comment, state, imagename from tasks, users WHERE tasks.user_id = users.user_id ORDER BY task_id DESC") or
            die('Connection Error: ' . $_db->connect_error);

        $results = array();

        while ($row = $_result->fetch_assoc()) {
            array_push($results, $row);
        }

        $this->_db->close();

        return $results;
    }

 }

/* COMMENTED OUT: Prints the data returned by MySQL
 $x = new Tasks();
 $y = $x->getResults("");
 print_r($y);
 echo 'Hello world'; */
?>
