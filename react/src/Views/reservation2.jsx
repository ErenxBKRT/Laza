

//-----------------------------------

import { useEffect, useState } from "react";
import * as fonction from "./Functions";
import PlaceC from "./PlaceC";
import PlaceP from "./PlaceP";
import PlaceV from "./PlaceV";

function Reservation() {
  const [voitures, setVoitures] = useState([]);
  const [classs, setClass] = useState("classic");
  const [reserver, setReserver] = useState(false);
  const [client, setClient] = useState({ nom: "", contact: "" });
  
  const FRAIS_BASE = 50000; // Modifier selon votre tarification réelle
  
  const [reservation, setReservation] = useState({
	idreservation:"",
    idclient: "",
    idvoit: "",
    place: "",
    datevoyage: "",
    classs: "Classic",
    frais: FRAIS_BASE,
    reste: "0"
  });
  
  const [modePaye, setModepaye] = useState("integral");
  const [avance, setAvance] = useState(0);

  // 1. Préparation de la réservation et gestion du client
  async function preparerReservation() {
    try {
      if (!client.nom || !client.contact) {
        alert("Veuillez remplir le nom et le contact du client.");
        return;
      }

      let id = await fonction.id(client);
      
      if (!id) {
        const nouveauClient = await fonction.ajouterclient(client.nom, client.contact);
        if (nouveauClient?.success) {
          id = await fonction.id(client);
        }
      }

      if (!id) {
        throw new Error("Impossible d'identifier ou de créer le client.");
      }

      let resteAplat = "0";
      if (modePaye === "Npaye") resteAplat = FRAIS_BASE.toString();
      
      setReservation(prev => ({
        ...prev,
        idclient: id,
        classs: classs,
        reste: resteAplat,
        payement: modePaye,
        avance: modePaye === "avance" ? Number(avance || 0) : 0
      }));
      
      setReserver(true);
    } catch (error) {
      console.error("Erreur lors de la préparation :", error);
      alert("Erreur lors de la récupération ou création du client : " + error.message);
    }
  }

  // 2. Mise à jour de l'avance et du reste à payer
  const handleAvanceChange = (valeur) => {
    const montantAvance = Number(valeur) || 0;
    setAvance(montantAvance);
    const reste = FRAIS_BASE - montantAvance;
    
    setReservation(prev => ({
      ...prev,
      reste: reste >= 0 ? reste.toString() : "0"
    }));
  };

  // 3. Validation finale de la réservation avec gestion des erreurs détaillée
  const validerReservation = async () => {
    try {
      console.log("Données envoyées à l'API :", reservation); // Pour déboguer dans la console
      
      const payload = {
        ...reservation,
        payement: modePaye,
        avance: modePaye === "avance" ? Number(avance || 0) : 0
      };

      await fonction.reserver(payload);
      
      alert("Réservation réussie !");
      setReserver(false);
    } catch (error) {
      // Affiche l'erreur réelle retournée par votre backend
      console.error("Détails de l'échec de la réservation :", error);
      alert(`Échec de la réservation : ${error.message || "Erreur serveur"}`);
    }
  };

  // Écran de confirmation de paiement[cite: 2]
  if (reserver) {
    return (
      <>
        <h2>RESERVATION</h2>
        <br />
        <h3>Mode de payement</h3>
        <div className="ModePaye">
          <div className="carte">
            <p>Nom</p><p className="reponse">{client.nom}</p>
            <p>Contact</p><p className="reponse">{client.contact}</p>
            <p>Classe</p><p className="reponse">{classs}</p>
            <p>Voiture</p><p className="reponse">{reservation.idvoit}</p>
            <p>Place</p><p className="reponse">{reservation.place}</p>
            <p>Date</p><p className="reponse">{reservation.datevoyage}</p>
            <p>Total Frais</p><p className="reponse">{reservation.frais} Ar</p>
          </div>

          <div className="Payement">
			<p>Numero de reservation</p>
			<input type="text" onChange={(e) => setReservation(prev => ({ ...prev, idreservation: e.target.value }))}></input>
            <p>Mode de payement</p>
            <select value={modePaye} onChange={(e) => {
              const mode = e.target.value;
              setModepaye(mode);
              if (mode === "integral") {
                setReservation(prev => ({ ...prev, reste: "0" }));
              } else if (mode === "Npaye") {
                setReservation(prev => ({ ...prev, reste: reservation.frais.toString() }));
              } else {
                setReservation(prev => ({ ...prev, reste: (FRAIS_BASE - avance).toString() }));
              }
            }}>
              <option value="integral">Tout payé</option>
              <option value="avance">Avec avance</option>
              <option value="Npaye">Sans avance</option>
            </select>

            {modePaye === "avance" && (
              <>
                <p>Avance :</p>
                <input 
                  type="number" 
                  value={avance} 
                  onChange={(e) => handleAvanceChange(e.target.value)} 
                />
              </>
            )}

            {(modePaye === "avance" || modePaye === "Npaye") && (
              <p>Reste à payer : {reservation.reste} Ar</p>
            )}

            <div style={{ marginTop: "15px" }}>
              <button onClick={validerReservation}>Confirmer</button>
              <button onClick={() => setReserver(false)} style={{ marginLeft: "10px" }}>Annuler</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Écran de saisie initial[cite: 2]
  return (
    <>
      <h2>RESERVATION</h2>
      <br />
      <div className="iresersvation">
        <div className="dateC">
          <div className="dateclass">
            <label htmlFor="dateV">Date de voyage : </label><br />
            <label htmlFor="classV">Classe : </label>
          </div>
          <div className="idateclass">
            <input 
              type="date" 
              id="dateV" 
              onChange={(e) => setReservation(prev => ({ ...prev, datevoyage: e.target.value }))} 
            /><br />
            <select id="classV" value={classs} onChange={(a) => setClass(a.target.value)}>
              <option value="classic">Classic</option>
              <option value="premium">Premium</option>
              <option value="VIP">VIP</option>
            </select><br /><br />
          </div>
        </div>
        
        <div className="formplace">
          <div className="placenom">
            <label htmlFor="iname">Nom : </label><br />
            <label htmlFor="inum">Contact : </label><br />
            <label htmlFor="ivoit">Voiture :</label><br />
            <label htmlFor="iplace">Place : </label><br />
          </div>
          <div className="iplacenom">
            <input type="text" id="iname" onChange={(e) => setClient(prev => ({ ...prev, nom: e.target.value }))} /><br />
            <input type="text" id="inum" onChange={(e) => setClient(prev => ({ ...prev, contact: e.target.value }))} /><br />
            <input type="text" id="ivoit" onChange={(e) => setReservation(prev => ({ ...prev, idvoit: e.target.value }))} /><br />
            <input type="text" id="iplace" onChange={(e) => setReservation(prev => ({ ...prev, place: e.target.value }))} /><br />
          </div>
        </div>
        
        <button id="reservebutton" onClick={preparerReservation}>RESERVER</button>
      </div>

      <VoitureDispo date={reservation.datevoyage} classs={classs} />
    </>
  );
}

// Composant VoitureDispo[cite: 2]
// Composant VoitureDispo amélioré dans Reservation.jsx
function VoitureDispo({ date, classs }) {
  const [voitures, setVoitures] = useState([]);
  const [placeoccupe, setPlaceoccupe] = useState([]);
  const [erreur, setErreur] = useState("");

  // 1. Charger les voitures
  useEffect(() => {
    async function chargerVoitures() {
      try {
        const data = await fonction.listervoiture();
        setVoitures(data || []);
        setErreur("");
      } catch (error) {
        setErreur("Impossible de charger les voitures");
      }
    }
    chargerVoitures();
  }, [date, classs]);

  // 2. Charger les places occupées pour la date sélectionnée (Comme dans Voiture.jsx !)
  useEffect(() => {
    async function chargerOccupations() {
      if (!date) return;
      try {
        const data = await fonction.listerPlacesParDate(date);
        setPlaceoccupe(data || []);
      } catch (error) {
        console.error("Erreur de chargement des places occupées :", error);
      }
    }
    chargerOccupations();
  }, [date]);

  // Filtrer les voitures selon la catégorie (classe) demandée (Classic, Premium, VIP)
  // On compare en minuscules pour éviter les erreurs de casse ("classic" vs "Classic")
  const voituresFiltrees = voitures.filter(
    (v) => (v?.typevoit || "").toLowerCase() === (classs || "").toLowerCase()
  );

  return (
    <div className="contener-voit" style={{ marginTop: "30px" }}>
      <h3>Plans de places pour la date : {date || "Sélectionnez une date"} ({classs})</h3>
      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      
      {!date ? (
        <p>Veuillez choisir une date pour voir les places occupées.</p>
      ) : voituresFiltrees.length === 0 ? (
        <p>Aucune voiture disponible dans la catégorie {classs} à cette date.</p>
      ) : (
        voituresFiltrees.map((voit) => (
          <div 
            key={voit.idvoit} 
            className="bloc-voiture-places" 
          >
            <h4 style={{ marginBottom: "15px" }}>
              Matricule : <span style={{ color: "#2c3e50" }}>{voit.idvoit}</span> ({voit.design})
            </h4>
            
            {/* On réutilise les mêmes composants de places en leur transmettant les informations */}
            {classs.toLowerCase() === "classic" && (
              <PlaceC voiture={voit} placesOccupees={placeoccupe} />
            )}
            {classs.toLowerCase() === "premium" && (
              <PlaceP voiture={voit} placesOccupees={placeoccupe} />
            )}
            {classs.toLowerCase() === "vip" && (
              <PlaceV voiture={voit} placesOccupees={placeoccupe} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Reservation;