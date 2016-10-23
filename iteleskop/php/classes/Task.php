<?php

/// @brief This class offer operations on a single task: add, clone, edit
class Task {

    private $_db;

    // Constructor, creates MySQL connection and sets code page
    public function __construct() {
        global $photon_catcher_host;
        global $photon_catcher_user;
        global $photon_catcher_pass;
        global $photon_catcher_db;

        $this->_db = new mysqli($photon_catcher_host, $photon_catcher_user,
                                $photon_catcher_pass, $photon_catcher_db);

        $_db = $this->_db;

        if ($_db->connect_errno) {
            die('Connection Error: ' . $_db->connect_error);
        }

        if (!$_db->set_charset("utf8")) {
            die('Setting charset to utf8 failed: '. $_db->error);
        }

        return $_db;
    }

    /// @todo: Depending on how it is called, we need to either:
    /// 1) printf('{ "success": true, "msg": "%s" }', $txt) (if it's called from add_task.php)
    /// 2) do:
    ///    $answer = array();
    ///    $answer['failure'] = true;
    ///    $answer['msg'] = 'MySQL connection error: '.$this->error;
    ///    return $answer; (if it's called from the connector using AddTask.cloneTask()

    /// @return an array with parameters explaining what is wrong (or empty array if ok)
    function validateNewTask($data) {
        if (!isset($data)) {
            return $this->failure("Validation failed: passed data is not an array");
        }

        if (!$this->exists($data, "user_id")) {
            return $this->failure("user_id not set.");
        }
        if (!$this->exists($data, "object")) {
            return $this->failure("object not set");
        }
        // @todo: implement real validation here

        return array();
    }

    function quoted($data, $name, $comma) {
        if (is_array($data)) {
            $txt = '"'.$data[$name].'"';
        }
        if (is_object($data)) {
            $txt = '"'.$data->$name.'"';
        }
        if ($comma) {
            return $txt.", ";
        } else {
            return $txt;
        }
    }

    function quotedBool($data, $name, $comma) {
        if (is_array($data)) {
            $txt = $data[$name];
        }
        if (is_object($data)) {
            $txt = $data->$name;
        }
        if (strlen($txt)) {
            $txt = 1;
        } else {
            $txt = 0;
        }

        if ($comma) {
            return $txt.", ";
        } else {
            return $txt;
        }
    }

    function printQuery($q) {
        $tmp = str_split($q, 160);
        $txt = " query=<br/>";

        foreach ($tmp as $line) {
            $txt .= $line."<br/>";
        }
        return $txt;
    }

    function insert($data) {
        $q = 'INSERT INTO tasks(user_id, state, scope_id, object, ra, decl, exposure, descr, '.
             'filter, binning, guiding, auto_center, dither, defocus, calibrate, solve, vphot, '.
             'other_cmd, min_alt, max_sun_alt, moon_distance, max_moon_phase, min_interval, '.
             'skip_before, skip_after, comment, created) '.
            'VALUES('.
            $this->quoted($data, 'user_id', true).
            $this->quoted($data, 'state', true).
            $this->quoted($data, 'scope_id', true).
            $this->quoted($data, 'object', true).
            $this->quoted($data, 'ra', true).
            $this->quoted($data, 'decl', true).
            $this->quoted($data, 'exposure', true).
            $this->quoted($data, 'descr', true).
            $this->quoted($data, 'filter', true).
            $this->quoted($data, 'binning', true).
            $this->quoted($data, 'guiding', true).
            $this->quoted($data, 'auto_center', true).
            $this->quoted($data, 'dither', true).
            $this->quoted($data, 'defocus', true).
            $this->quoted($data, 'calibrate', true).
            $this->quoted($data, 'solve', true).
            $this->quoted($data, 'vphot', true).
            $this->quoted($data, 'other_cmd', true).
            $this->quoted($data, 'min_alt', true).
            $this->quoted($data, 'max_sun_alt', true).
            $this->quoted($data, 'moon_distance', true).
            $this->quoted($data, 'max_moon_phase', true).
            $this->quoted($data, 'min_interval', true).
            $this->quoted($data, 'skip_before', true).
            $this->quoted($data, 'skip_after', true).
            $this->quoted($data, 'comment', true).
            "now())";  // created

        $_result = $this->_db->query($q);
        if (!$_result) {
            $txt = "<b>Database connection failure.</b><br/>".
                "Debug info: DB error=". $this->_db->error."<br/>".
                "DB connection error=". $this->_db->connect_error;

            global $photon_catcher_debug;
            if ($photon_catcher_debug) {
                $txt .= ", ".$this->printQuery($q);
            }

            return $this->failure($txt);
        }

        $last_id = $this->_db->insert_id;

        $txt = "Observation task added for object <b>".$this->quoted($data, "object", false).
            "</b>, task id is <b>".$last_id."</b>";

        return $this->success($txt);
    }

    function success($txt) {
        $x = array();
        $x['success'] = true;
        $x['msg'] = $txt;
        return $x;
    }

    function failure($txt) {
        $x = array();
        $x['failure'] = true;
        $x['msg'] = $txt;
        return $x;
    }

    function getParam($name) {
        if (isset($_POST[$name])) {
            $this->data[$name] = $_POST[$name];
            return;
        }
        if (!isset($_GET[$name])) {
            return $this->failure("Mandatory parameter missing: ".$name);
        }
        $this->data[$name] = $_GET[$name];
        return "";
    }

    function getBoolParam($name) {
        if (isset($_POST[$name])) {
            if ($_POST[$name] == "on") {
                $this->data[$name] = 1;
            } else {
                $this->data[$name] = 0;
            }
            return;
        }
        if (isset($_GET[$name])) {
            if ($_GET[$name] == "on") {
                $this->data[$name] = 1;
            } else {
                $this->data[$name] = 0;
            }
            return;
        }
        $this->data[$name] = 0;
    }

    // It's time to retrieve all data from POST or GET.
    function getData() {
        $this->data = array();

        $this->getParam("user_id");
        $this->getParam("state");
        $this->getParam("scope_id");
        $this->getParam("object");
        $this->getParam("ra");
        $this->getParam("decl");
        $this->getParam("exposure");
        $this->getParam("descr");
        $this->getParam("filter");
        $this->getParam("binning");
        $this->getBoolParam("guiding");
        $this->getBoolParam("auto_center");
        $this->getBoolParam("dither");
        $this->getBoolParam("defocus");
        $this->getBoolParam("calibrate");
        $this->getBoolParam("solve");
        $this->getBoolParam("vphot");
        $this->getParam("other_cmd");
        $this->getParam("min_alt");
        $this->getParam("max_sun_alt");
        $this->getParam("moon_distance");
        $this->getParam("max_moon_phase");
        $this->getParam("min_interval");
        $this->getParam("skip_before");
        $this->getParam("skip_after");
        $this->getParam("comment");

        return ($this->data);
    }

    // Converts data to a single script. Useful mostly for debugging.
    function dataToText($x) {
        $str = "";
        foreach ($x as $key => $value) {
            $str .= $key."=".$value." ";
        }
        return $str;
    }

    function cloneTask($params) {
        global $photon_catcher_debug;

        $result = $this->validateNewTask($params);
        if (count($result)) {
            $result['failure'] = true;
            if ($photon_catcher_debug) {
                $result['msg'] .= ", params= ".var_export($params, true);
            }
            return $result;
        }

        // return $this->success($this->dataToText($params));
        // Insert returns the structure that represents the outcome
        // The result is an array with either success or failure fields set.
        return $this->insert($params);
    }

    function validateEdit($params) {
        return array();
    }

    function get($params, $name) {
        if (is_array($data)) {
            return $params[$name];
        }
        if (is_object($data)) {
            return $params->$name;
        }
        return "";
    }

    function exists($params, $name) {
        if (is_array($params)) {
            return array_key_exists($name, $params);
        }
        if (is_object($params)) {
            return isset($params->$name);
        }
        return false;
    }

    function edit($params) {
        // First check if the edited task is owned by the user.

        $result = $this->validateEdit($params);
        if (count($result)) {
            $result['failure'] = true;
            if ($photon_catcher_debug) {
                $result['msg'] .= ", params= ".var_export($params, true);
            }
            return $result;
        }

        $q = "UPDATE tasks SET object=".$this->quoted($params, "object", true)
            ." ra=".$this->quoted($params, "ra", true)
            ." decl=".$this->quoted($params, "decl", true)
            ." exposure=".$this->quoted($params, "exposure", true)
            ." state=".$this->quoted($params, "state", true)
            ." descr=".$this->quoted($params, "descr", true)
            ." comment=".$this->quoted($params, "comment", true)
            ." filter=".$this->quoted($params, "filter", true)
            ." binning=".$this->quoted($params, "binning", true)
            ." guiding=".$this->quotedBool($params, "guiding", true)
            ." dither=".$this->quotedBool($params, "dither", true)
            ." defocus=".$this->quotedBool($params, "defocus", true)
            ." calibrate=".$this->quotedBool($params, "calibrate", true)
            ." solve=".$this->quotedBool($params, "solve", true)
            ." vphot=".$this->quotedBool($params, "vphot", true)

            ." min_alt=".$this->quoted($params, "min_alt", true)
            ." max_sun_alt=".$this->quoted($params, "max_sun_alt", true)
            ." moon_distance=".$this->quoted($params, "moon_distance", true)
            ." max_moon_phase=".$this->quoted($params, "max_moon_phase", true)
            ." min_interval=".$this->quoted($params, "min_interval", true)

            ." skip_before=".$this->quoted($params, "skip_before", true)
            ." skip_after=".$this->quoted($params, "skip_after", true)

            ." scope_id=".$this->quoted($params, "scope_id", true)
            ." auto_center=".$this->quoted($params, "auto_center", false)

            ." WHERE task_id = ". $this->quoted($params, "task_id", false)
            ." AND user_id = ". $this->quoted($params, "user_id", false).";";

        $_result = $this->_db->query($q);
        if (!$_result) {
            return $this->failure("<b>Database connection failure.</b><br/>".
                                  "Debug info: DB error=". $this->_db->error."<br/>".
                                  "DB connection error=". $this->_db->connect_error);
        }
        $rows = $this->_db->affected_rows;
        if ($rows != 1) {
            $txt = "<b>Task not updated (".$rows." row(s) affected). You didn't ".
                "change anything or this was not your task.";

            global $photon_catcher_debug;
            if ($photon_catcher_debug) {
                $txt .= ", ".$this->printQuery($q);
            }

            return $this->failure($txt);
        }

        $txt = "Observation task <b>".$this->quoted($params, "task_id", false)
            ."</b> updated. Click Refresh to reload data from database.";

        return $this->success($txt);
    }
};

?>
