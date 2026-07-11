<?php

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "database.php";

class VoitureController {

    public function listerVoit (){
        global $database;
        //prendre la liste des voiture dans la base de donnee
        $stmt = $database->prepare("SELECT* FROM voiture");
        $stmt->execute();
        //donner la liste des voiture dans le front
        return json_encode($stmt->fetchAll());
    }

    public function voirPlace (){
        global $database;
        //prendre la date a voir
        $data = json_decode(file_get_contents('php://input'), true);

        //prendre les places disponibles
        $stmt = $database->prepare("SELECT * FROM place WHERE date = ?");
        //select les places
        $stmt ->execute([$data['date']]);
        return json_encode($stmt->fetchAll());
    }

    public function modifierVoit(){ 
        global $database;
        //prendre les nouveaux donnee
        $data = json_decode(file_get_contents('php://input'), true);

        //donner les nouveaux donnee a la base de donnee
        $stmt = $database->prepare("UPDATE voiture SET idvoit = ?, frais = ? WHERE idvoit = ?");
        $stmt->execute([$data['newid'], $data['frais'], $data['idvoit']]);

        return json_encode([
            'success' => true,
            'message' => 'Voiture modifie'
        ]);
    }

    public function supVoit(){
        global $database; 

        $data = json_decode(file_get_contents('php://input'), true);

        //supprimer la voiture dans la base de donnee
        $stmt = $database->prepare("DELETE FROM voiture WHERE idvoit = ?");
        $stmt->execute([$data['idvoit']]);

        return json_encode([
            'success' => true,
            'message' => 'Voiture supprime'
        ]);
    } 

    public function ajouterVoit(){
        global $database;
        //prendre les nouveaux donnee
        $data = json_decode(file_get_contents('php://input'), true);

        //donner les nouveaux donnee a la base de donnee
        $stmt = $database->prepare("INSERT INTO voiture (design,typevoit,nbrplace,frais)
        VALUES (:design,:typevoit,:nbrplace,:frais)");

        $stmt->execute([
            'design' => $data['design'],
            'typevoit' => $data['typevoit'],
            'nbrplace' => $data['nbrplace'],
            'frais' => $data['frais']
        ]);

        return json_encode([
            'success' => true,
            'message' => 'Voiture ajoutee'
        ]);  

    }
}
