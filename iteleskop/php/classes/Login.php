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
        $q = "SELECT user_id, pass FROM users WHERE login='".$user."'";

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
            $answer['msg'] = 'Brak użytkownika o loginie: ' . $user;
            return $answer;
        }

        // Jest entry w bazie. Pobierz je i sprawdz haslo.
        $row = $_result->fetch_assoc();

        $db_pass = $row['pass'];
        if ($md5pass == $db_pass) {
            // Poprawne haslo, podajmy mu user_id
            $answer['success'] = true;
            $answer['user_id'] = $row['user_id'];
        } else {
            // Niepoprawne haslo, niech spada na drzewo.
            $answer['failure'] = true;
            $answer['msg'] = 'Nieprawidłowe hasło.';
        }

        $this->_db->close();

        return $answer;
    }
}

?>
