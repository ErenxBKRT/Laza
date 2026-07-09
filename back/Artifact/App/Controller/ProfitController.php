<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class ProfitController {
    public function getProfit(){
        global $database;

        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $database->prepare("SELECT place FROM VOITURE WHERE type = ? AND occupation = oui");
        $stmt->execute([$data['type']]);
        return json_encode($stmt->fetchAll());
    }
}
