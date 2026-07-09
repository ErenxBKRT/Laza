<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class Profit {
    public function getProfit(){
        global $database;

        //prendre la date a voir
        $data = json_decode(file_get_contents('php://input'), true);

        //regarder les places vendus par type de voiture
        $stmt = $database->prepare("SELECT place FROM VOITURE WHERE type = ? AND occupation = oui");
        $stmt->execute([$data['type']]);
        return json_encode($stmt->fetchAll());
        
    }
}  
