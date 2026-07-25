<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class ProfitController {
    public function getPlaceC($date1, $date2){
        global $database;

        //prendre la date a voir
        $data = json_decode(file_get_contents('php://input'), true);

        //regarder les places vendus par type de voiture
        $stmt = $database->prepare("SELECT * FROM reserver JOIN voiture ON voiture.idvoit=reserver.idvoit WHERE datevoyage BETWEEN '$date1' and '$date2' and voiture.typevoit = 'classic'");
        $stmt->execute();

        $number = $stmt->fetchAll();
        return json_encode(["count" => count($number)]);  
    }

    public function getPlaceP( $date1, $date2){
        global $database;

        //prendre la date a voir
        $data = json_decode(file_get_contents('php://input'), true);

        //regarder les places vendus par type de voiture
        $stmt = $database->prepare("SELECT * FROM reserver JOIN voiture ON voiture.idvoit=reserver.idvoit WHERE datevoyage BETWEEN '$date1' and '$date2' and voiture.typevoit = 'premium'");
        $stmt->execute();

        $count = $stmt->fetchAll();
        return json_encode(["count" => count($count)]);     
    }

    public function getPlaceV( $date1, $date2){
        global $database;

        //prendre la date a voir
        $data = json_decode(file_get_contents('php://input'), true);

        //regarder les places vendus par type de voiture
        $stmt = $database->prepare("SELECT * FROM reserver JOIN voiture ON voiture.idvoit=reserver.idvoit WHERE datevoyage BETWEEN '$date1' and '$date2' and voiture.typevoit = 'VIP'");
        $stmt->execute();
        
        $count = $stmt->fetchAll();
        return json_encode(["count" => count($count)]);     
        
    }

    public function getProfitG ( $date1,$date2){
        global $database;

        $stmt = $database->prepare("SELECT SUM(frais) as total FROM reserver JOIN voiture ON voiture.idvoit=reserver.idvoit WHERE datevoyage BETWEEN '$date1' and '$date2'");
        $stmt->execute();

        $count = $stmt->fetchAll();
        return json_encode($count);
    }
}
