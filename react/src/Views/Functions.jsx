//---------------------------------------------------------------------------------
                           // FONCTION CLIENT
//---------------------------------------------------------------------------------

export async function listerClient() {
  const response = await fetch('http://localhost:8000/client/client', {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des clients");
  }

  return await response.json();
}

export function ajouterclient (nom,numtel){
    //demander aux backend d'inserer une nouvelle client dans la base de donnee avec les parametres
    return fetch('http://localhost:8000/client/client-add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom,
            numtel,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du client");
        }

        return response.json();
    });
}


export function modifierclient (id,nom,numtel){
    //demander au backend de modifier les information du client avec l'id specifie
    return fetch('http://localhost:8000/client/client-mod', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idclient: id,
            nom: nom,
            numtel: numtel,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de la modification du client");
        }

        return response.json();
    });
}

export function supprimerclient (id){
    //demander au backend de supprimer le client avec cette id dans la base de donnee
    return fetch('http://localhost:8000/client/client-sup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idclient: id,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du client");
        }

        return response.json();
    });
}

//---------------------------------------------------------------------------------
                           // FONCTION VOITURE
//---------------------------------------------------------------------------------


export async function listervoiture (){
    //demander au backend la liste des voitures dans la bd
    const response = await fetch('http://localhost:8000/voiture/voiture',{
        method: "GET",});

    if (!response.ok){
        throw new Error("impossible de charger les voiture");     
    }

    return await response.json();
}

export function ajoutervoiture (id, designation, type, nbplace, frais){
    //demander au backend d'inserer une nouvelle voiture dans la base de donnee avec ces parametres

}

export function modifiervoiture (id, frais, newid){
    //demander au backend de modifier les information de cette voiture avec l'id specifie
    return fetch('http://localhost:8000/voiture/voiture-mod', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idvoit: id,
            frais: frais,
            newid: newid,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de la modification du voiture");
        }

        return response.json();
    });
}

export function supprimervoiture (id){
    //demander au backend de supprimer la voiture avec cette id dans la base de donnee
    return fetch('http://localhost:8000/voiture/voiture-sup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idvoit: id,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du client");
        }

        return response.json();
    });
}


//---------------------------------------------------------------------------------
                           // FONCTION RESERVER
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
                           // FONCTION PROFIT
//---------------------------------------------------------------------------------
