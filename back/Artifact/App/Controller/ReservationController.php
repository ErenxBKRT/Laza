<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class ReservationController {

    public function listereservation (){

        global $database;

        $stmt = $database->prepare("SELECT* FROM reserver");
        $stmt->execute();

        return json_encode($stmt->fetchAll());

    }

    public function chercherVoit (){

        global $database;

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $type = $data['type'] ?? null;
        $date = $data['date'] ?? null;

        $stmt = $database->prepare("SELECT idvoit FROM voiture WHERE typevoit = :type");
        $stmt->execute([
            'type' => $type
        ]);

        $voitures = $stmt->fetchAll();

        return json_encode($voitures);
    }

    public function reserver(){
        global $database;

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $idreserv = $data['idreservation'] ?? null;
        $idclient = $data['idclient'] ?? null;
        $idvoit = $data['idvoit'] ?? null;
        $place = $data['place'] ?? null;
        $datevoyage = $data['datevoyage'] ?? null;
        $payement = $data['payement'] ?? 'integral';
        $avance = $data['avance'] ?? 0;

        if (!$idclient || !$idvoit || !$place || !$datevoyage) {
            http_response_code(400);
            return json_encode([
                'success' => false,
                'message' => 'Champs manquants pour la réservation'
            ]);
        }

        $stmt = $database->prepare(" 
            INSERT INTO reserver(idreserv, idvoit, idclient, place, datereserv, datevoyage, payement, montantavance)
            VALUES (:idreserv, :idvoit, :idclient, :place, NOW(), :datevoyage, :payement, :avance)
        ");

        $stmt->execute([
            'idreserv' => $idreserv,
            'idvoit' => $idvoit,
            'idclient' => $idclient,
            'place' => $place,
            'datevoyage' => $datevoyage,
            'payement' => $payement,
            'avance' => $avance
        ]);

        return json_encode([
            'success' => true,
            'message' => 'Reservation ajoutee'
        ]);
    }

    public function rechercheId(){
        global $database;

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $nom = $data['nom'] ?? '';
        $numtel = $data['numtel'] ?? '';

        $stmt = $database->prepare("SELECT idclient FROM client WHERE nom = :nom AND numtel = :numtel LIMIT 1");
        $stmt->execute([
            'nom' => $nom,
            'numtel' => $numtel
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return json_encode($result ? [ $result ] : []);
    }
}

