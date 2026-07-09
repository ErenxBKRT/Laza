<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class ReservationController {

    public function chercherVoit (){

        global $database;
        
        //prendre les classes pour voir les viture disponible et la date pour voir les places disponible pour cette voiture dans le front 
        $data = json_decode(file_get_contents('php://input'), true);
        
        $type = $data['type'] ?? null;
        $date = $data['date'] ?? null;
        
        //SELECT idvoit FROM voiture WHERE type='le nalaina'  
        $stmt = $database->prepare("SELECT idvoit FROM voiture WHERE type = :type");
        $stmt->execute([
            'type' => $type
        ]);
        
        $voitures = $stmt->fetchAll();
        
        return json_encode($voitures);

        
    }

    public function reserver(){

    global $database;

    $data = json_decode(file_get_contents('php://input'), true);

    //envoyer les donner dans la bd dans la classe voit
    $stmt = $database->prepare("
        INSERT INTO reservation(idcli, idvoit, date_reservation, place)
        VALUES (:idcli, :idvoit, :date_reservation, :place)
    ");

    $stmt->execute([
        'idcli' => $data['idcli'],
        'idvoit' => $data['idvoit'],
        'date_reservation' => $data['date_reservation'],
        'place' => $data['place']
    ]);

    return json_encode([
        'success' => true,
        'message' => 'Reservation ajoutee'
    ]);
    }   
}
