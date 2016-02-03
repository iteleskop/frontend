<?php

/// @brief Klasa odpowiada za przetworzenie proby logowania.
///
/// Sprawdza podane 2 parametry: user i md5pass i porównuje je z wartosciami
/// z bazy, a nastepnie zwraca jedna z dwoch struktur:
///
/// { 'success': true, 'login': ..., 'user_id': 123 }
/// { 'failure': true, msg: '...' }
class Login {

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

        return $_db;
    }

    public function verify($params) {
        $_db = $this->_db;

        // Pobierz dane przeslane przez strone klienta.
        /// @todo: To NAPRAWDE powinien byc hash, a nie samo haslo!
        $user = $params->user;
        $md5pass = $params->md5pass;

        // Przygotuje kwerke
        $q = "SELECT user_id, pass, login, firstname, lastname, share, phone, email, ".
            "permissions, aavso_id, ftp_login, ftp_pass FROM users WHERE login='".$user."'";

        // A tu biedziemy wrzucac odpowiedz.
        $answer = array();

        $_result = $_db->query($q);
        if (!$_result) {
            // Uh oh, cos sie popsulo z query do MySQLa. Wyswietl blad,
            // moze on cos podpowie userowi.
            $answer['failure'] = true;
            $answer['msg'] = 'MySQL error: '.$_db->error;
            return $answer;
        }

        if ($_result->num_rows == 0) {
            // Kwerka zwrocila zero wierszy, czyli uzytkownik podal zly
            // login.
            $answer['failure'] = true;
            $answer['msg'] = 'No user with such a login: ' . $user;
            return $answer;
        }

        // Jest entry w bazie. Pobierz je i sprawdz haslo.
        $row = $_result->fetch_assoc();

        $db_pass = $row['pass'];
        if ($md5pass == $db_pass) {
            // Poprawne haslo, podajmy mu user_id
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
            // Niepoprawne haslo, niech spada na drzewo.
            $answer['failure'] = true;
            $answer['msg'] = 'Incorrect password.';
        }

        $this->_db->close();

        return $answer;
    }
}

?>
