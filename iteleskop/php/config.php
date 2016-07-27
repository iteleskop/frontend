<?php

// Global variables used in all PHP files.
$photon_catcher_host = 'localhost';
$photon_catcher_user = 'iteleskop';
$photon_catcher_pass = 'Vox0OhMa';
$photon_catcher_db   = 'iteleskop';

$photon_catcher_debug = false;

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
                'deleteTask' => array(
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
