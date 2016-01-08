<?php

// Zmienne globalne, ktore sa dostepne we wszystkich plikach PHP
$photon_catcher_host = 'localhost';
$photon_catcher_user = 'iteleskop';
$photon_catcher_pass = 'Vox0OhMa';
$photon_catcher_db   = 'iteleskop';

 function get_extdirect_api() {

    $API = array(
        'QueryUsers' => array(
            'methods' => array(
                'getResults' => array(
                    'len' => 1
                    )
                )
            ),
        'QueryTasks' => array(
            'methods' => array(
                'getResults' => array(
                    'len' => 1
                    )
                )
            ),
        'QueryObjects' => array(
            'methods' => array(
                'getResults' => array(
                    'len' => 1
                    )
                )
            ),
        'Login' => array(
            'methods' => array(
                'verify' => array(
                    'params' => array(
                        'user',
                        'md5pass'
                        )
                    )
                )
            )
        );

    return $API;
 }

?>
