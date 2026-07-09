<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class clientController {

    public function listerClient (){
        global $database;

        //prendre la liste des client dans la base de donnee
        $stmt = $database->prepare("SELECT * FROM client");

        //SELECT* FROM client; 
        $stmt->execute(); 

        //donner la liste des client dans le front 
        return json_encode($stmt->fetchAll());

    }

    public function modifierClient(){
        global $database;
        //prendre les nouveaux donnee
        $data = json_decode(file_get_contents('php://input'), true);

        //donner les nouveaux donnee a la base de donnee
        $stmt = $database->prepare("UPDATE client SET nom = ?, numtel = ? WHERE idclient = ?");
        $stmt->execute([$data['nom'], $data['numtel'], $data['idclient']]);

        return json_encode([
            'success' => true,
            'message' => 'Client modifie'
        ]);
    }

    public function ajouterClient(){
        global $database;

        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $database->prepare("INSERT INTO client (nom, numtel) VALUES (?, ?)");
        $stmt->execute([$data['nom'], $data['numtel']]);

        return json_encode([
            'success' => true,
            'message' => 'Client ajoute',
            'idclient' => $database->lastInsertId()
        ]);
    }

    public function supClient(){
        global $database;

        //prendre l'id du client a supprimer
        $data = json_decode(file_get_contents('php://input'), true);

        //supprimer le client dans la base de donnee
        $stmt = $database->prepare("DELETE FROM client WHERE idclient = ?");
        $stmt->execute([$data['idclient']]);

        return json_encode([
            'success' => true,
            'message' => 'Client supprime'
        ]);
    } 
}
