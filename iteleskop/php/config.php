<?php

// Zmienne globalne, ktore sa dostepne we wszystkich plikach PHP
$photon_catcher_host = 'localhost';
$photon_catcher_user = 'iteleskop';
$photon_catcher_pass = '';
$photon_catcher_db   = 'iteleskop';

 function get_extdirect_api() {

    $API = array(
        'QueryDatabase' => array(
            'methods' => array(
                'getResults' => array(
                    'len' => 1
                )
            )
        )
    );

    return $API;
 }

?>
