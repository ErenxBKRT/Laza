<?php

$GLOBALS["database"] = new PDO(
    'mysql:host=localhost;port=3306;dbname=PHP2;charset=utf8mb4',
    'root',
    'Amaranthe21I',
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
);

$database = $GLOBALS["database"];
