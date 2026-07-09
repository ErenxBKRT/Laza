<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once dirname(__DIR__) . '/vendor/autoload.php';

use Artifact\Core\Forge;

$App = new Forge();
$App->run();