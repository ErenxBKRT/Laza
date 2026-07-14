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
        INSERT INTO reserver(idcli, idvoit, place,datevoyage,datereserv,payement,avance)
        VALUES (:idcli, :idvoit, :place, :datevoyage, CURDATE(), :payement, :avance)
    ");

    $stmt->execute([
        'idcli' => $data['idclient'],
        'idvoit' => $data['idvoit'],
        'datevoyage' => $data['datevoyage'],
        'place' => $data['place'],
        'payement' => $data['payement'],
        'avance' => $data['avance']
    ]);

    return json_encode([
        'success' => true,
        'message' => 'Reservation ajoutee'
    ]);
    }   
}
