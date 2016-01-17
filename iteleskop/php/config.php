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
        'Tasks' => array(
            'methods' => array(
                'getResults' => array(
                    'len' => 1
                    ),
                'update' => array(
                    'params' => array(
                        'user_id',
                        'task_id',
                        'new_state'
                        )
                    ),
                'delete' => array(
                    'params' => array(
                        'user_id',
                        'task_id'
                        )
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
