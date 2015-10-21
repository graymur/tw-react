<?php

include __DIR__ . '/../src/Messaging/bootstrap.php';

$app = new Silex\Application();

$app['debug'] = true;

// api v1
$app->mount('/api/1.0', new \Messaging\Controllers\APIVersion1());

// index page
$app->get('/', function () {
    ob_start();
    include __DIR__ . '/../src/Messaging/views/layout.php';
    return ob_get_clean();
});

$app->run();
