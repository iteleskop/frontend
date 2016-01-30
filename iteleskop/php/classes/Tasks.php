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

        $_result = $_db->query(
            "SELECT task_id, scope_id, object, ra, decl, tasks.user_id, users.login, ".
            "exposure, filter, binning, guiding, dither, auto_center, defocus, calibrate, ".
            "solve, vphot, other_cmd,".
            "min_alt, max_sun_alt, moon_distance, max_moon_phase, ".
            "min_interval, skip_before, skip_after, ".
            "comment, state, imagename ".
            "FROM tasks, users WHERE tasks.user_id = users.user_id ORDER BY task_id DESC");
        if (!$_result) {
            return $this->failure("MySQL error:". $_db->error);
        }

        $results = array();

        while ($row = $_result->fetch_assoc()) {
            array_push($results, $row);
        }

        $this->_db->close();

        return $results;
    }

    function success($txt) {
        $answer = array();
        $answer['success'] = true;
        $answer['msg'] = $txt;
        return $answer;
    }

    function failure($txt) {
        $answer = array();
        $answer['failure'] = true;
        $answer['msg'] = $txt;
        return $answer;
    }

    public function update($params) {
        $user_id = $params->user_id;
        $task_id = $params->task_id;
        $new_state = $params->new_state;

        $_db = $this->_db;
        $_result = $_db->query("UPDATE tasks SET state=".$new_state.
                               " WHERE task_id=".$task_id);
        if (!$_result) {
            return $this->failure("MySQL error:". $_db->error);
        }

        $this->_db->close();

        return $this->success("Task ".$task_id." updated to state ".$new_state);
    }

    public function delete($params) {
        $user_id = $params->user_id;
        $task_id = $params->task_id;

        $_db = $this->_db;
        $_result = $_db->query("DELETE FROM tasks WHERE task_id=".$task_id);

        if (!$_result) {
            return $this->failure("MySQL error:". $_db->error);
        }

        $this->_db->close();

        return $this->success("Task ".$task_id." deleted.");
    }

 }

/* COMMENTED OUT: Prints the data returned by MySQL
 $x = new Tasks();
 $y = $x->getResults("");
 print_r($y);
 echo 'Hello world'; */
?>
