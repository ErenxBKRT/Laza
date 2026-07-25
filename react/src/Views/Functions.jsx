//---------------------------------------------------------------------------------
                           // FONCTION CLIENT
//---------------------------------------------------------------------------------

export async function listerClient() {
  const response = await fetch('http://localhost:8000/client/client', {method: "GET",});

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

export async function listerPlacesParDate(date) {
    const response = await fetch('http://localhost:8000/voiture/voiture-Place/'+date, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
 
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des places occupées");
    }

    return await response.json();
}

export async function listervoiture (){
    //demander au backend la liste des voitures dans la bd
    const response = await fetch('http://localhost:8000/voiture/voiture',{
        method: "GET",});

    if (!response.ok){
        throw new Error("impossible de charger les voiture");     
    }

    return await response.json();
}

export function ajoutervoiture (newvoit){
    //demander au backend d'inserer une nouvelle voiture dans la base de donnee avec ces parametres
    return fetch('http://localhost:8000/voiture/voiture-add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idvoit: newvoit.idvoit,
            design: newvoit.design,
            typevoit: newvoit.typevoit,
            nbrplace: newvoit.nbrplace,
            frais: newvoit.frais,
        }),
    }).then((response) => {
        if (!response.ok) {     
            throw new Error("Erreur lors de l'ajout du voiture");
        }

        return response.json();
    });
}

export function modifiervoiture (voiture){
    //demander au backend de modifier les information de cette voiture avec l'id specifie
    return fetch('http://localhost:8000/voiture/voiture-mod', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idvoit: voiture.idvoit,
            frais: voiture.frais,
            newid: voiture.newid,
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

export async function listerReservation (){
    const response = await fetch('http://localhost:8000/reservation/lister', {
        method: "GET",
    })
     if (!response.ok) {
    throw new Error("Erreur lors du chargement des reservations");
    }
    return await response.json();
}

export async function reserver(reservation){
    const response = await fetch('http://localhost:8000/reservation/reserver', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idreservation : reservation.idreservation,
            idvoit: reservation.idvoit,
            idclient: reservation.idclient,
            place: reservation.place,
            datevoyage: reservation.datevoyage,
            payement: reservation.payement,
            avance: reservation.avance,
        })
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la réservation");
    }

    return response.json();
}

export async function id(client) {
  const response = await fetch('http://localhost:8000/reservation/rechercheId', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },                      
    body: JSON.stringify({
      nom: client.nom,
      // On s'assure d'envoyer numtel au cas où le backend l'exige ici
      numtel: client.contact || client.numtel, 
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche d'id clients");
  }

  const data = await response.json();

  // 1. Si le client existe, on retourne son ID
  if (Array.isArray(data) && data.length > 0) {
    return data[0].idclient ?? null;
  }

  // 2. S'il n'existe pas (tableau vide), on le crée automatiquement !
  console.log("Client inexistant. Création automatique...");
  const nouveauClient = await ajouterclient(client.nom, client.contact);
  
  // On retourne l'ID du client fraîchement créé (selon la structure retournée par votre API)
  return nouveauClient.idclient || nouveauClient.id || null;
}
//---------------------------------------------------------------------------------
                           // FONCTION PROFIT
//---------------------------------------------------------------------------------

export async function voirprofitC(date1 ,date2){
    const response1 = await fetch('http://localhost:8000/profit/profitC/'+date1+'/'+date2, {
        method :"GET",
    })
    if (!response1.ok) {
        throw new Error("Erreur lors du chargement des places occupées");
    }
    return await response1.json();
}
export async function voirprofitP(date1 ,date2){
    const response = await fetch('http://localhost:8000/profit/profitP/'+date1+'/'+date2, {
        method :"GET",
    })
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des places occupées");
    }

    return await response.json();
    
}
export async function voirprofitV(date1 ,date2){
    const response = await fetch('http://localhost:8000/profit/profitV/'+date1+'/'+date2, {
        method :"GET",
    })
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des places occupées");
    }

    return await response.json();
    
}

export async function profitG(date1,date2){
    const response = await fetch('http://localhost:8000/profit/profitG/'+date1+'/'+date2, {
        method :"GET",
    })
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des places occupées");
    }

    return await response.json();
}