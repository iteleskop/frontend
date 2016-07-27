<?php

/// @brief Class responsible for processing login requests
///
/// Checks specified 2 parameters (user and md5pass) and compares them
/// with values from the database. Then returns one of the folllowing
/// structures:
///
/// { 'success': true, 'login': ..., 'user_id': 123 }
/// { 'failure': true, msg: '...' }
class Login {

    private $_db;
    protected $_result;
    public $results;

    public $error;

    public function __construct() {
        global $photon_catcher_host;
        global $photon_catcher_user;
        global $photon_catcher_pass;
        global $photon_catcher_db;

        $this->_db = new mysqli($photon_catcher_host, $photon_catcher_user,
                                $photon_catcher_pass, $photon_catcher_db);

        $_db = $this->_db;

        if ($_db->connect_error) {
            $answer['failure'] = true;
            $answer['msg'] = 'Connection error: '.$_db->connect_error;
            $this->error = $_db->connect_error;
            return $answer;
        }

        return $_db;
    }

    public function verify($params) {
        global $photon_catcher_debug;

        $_db = $this->_db;

        // We will put the response here.
        $answer = array();

        if (strlen($this->error)) {
            $answer['failure'] = true;
            $answer['msg'] = 'MySQL connection error: '.$this->error;
            return $answer;
        }

        // Get the data from the client. Note that the md5pass is
        // now actually an MD5 password.
        $user = $params->user;
        $md5pass = strtoupper($params->md5pass);

        // Here's the actual query
        $q = "SELECT user_id, pass_d, login, firstname, lastname, share, phone, email, ".
            "permissions, aavso_id, ftp_login, ftp_pass FROM users WHERE login='".$user."'";

        $_result = $_db->query($q);
        if (!$_result) {
            // Uh oh, mysql is broken. Let's display the error, maybe it will
            // give the user some clue.
            $answer['failure'] = true;
            $answer['msg'] = 'MySQL error: '.$_db->error;
            return $answer;
        }

        if ($_result->num_rows == 0) {
            // Query returned 0 rows, so the user specified wrong login.
            $answer['failure'] = true;
            $answer['msg'] = 'No user with such a login: ' . $user;
            return $answer;
        }

        // There's an entry in the DB. At least the login is good.
        // Get it and check if the pass matches.
        $row = $_result->fetch_assoc();

        $db_pass = strtoupper($row['pass_d']);
        if ($md5pass == $db_pass) {
            // Password is good, let's provide all the details.
            $answer['success'] = true;
            $answer['user_id'] = $row['user_id'];
            $answer['login'] = $row['login'];
            $answer['firstname'] = $row['firstname'];
            $answer['lastname'] = $row['lastname'];
            $answer['share'] = $row['share'];
            $answer['phone'] = $row['phone'];
            $answer['email'] = $row['email'];
            $answer['permissions'] = $row['permissions'];
            $answer['aavso_id'] = $row['aavso_id'];
            $answer['ftp_login'] = $row['ftp_login'];
            $answer['ftp_pass'] = $row['ftp_pass'];
        } else {
            // Nope, incorrect password. Buzz off!
            $answer['failure'] = true;
            $answer['msg'] = 'Incorrect password';
            if ($photon_catcher_debug) {
                $answer['msg'] .= ': provided ['.$md5pass.'] vs db ['.$db_pass.']';
            }
        }

        $this->_db->close();

        return $answer;
    }
}

?>
