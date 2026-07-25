import { useEffect, useState } from "react";
import * as fonction from "./Functions";
import PlaceC from "./PlaceC"
import PlaceP from "./PlaceP"
import PlaceV from "./PlaceV"


function Reservation() {
  const [liste,setListe]=useState(false)
  const [listreservation,setListreservation]=useState([])
  const [placeoccupe,setPlaceoccupe]=useState([])
  const [voitures,setVoitures]= useState([])
  const [erreur,setErreur]= useState("")
  const [classs, setClass] = useState("Classic");
  const [reserver, setReserver] = useState(false);
  const [client, setClient] = useState({ nom: "", contact: "" });
  const [reservation, setReservation] = useState({
    idreservation: "",
    idclient: "",
    idvoit: "",
    place: "",
    datevoyage: "",
    classs: "Classic",
    frais: "",
    reste: "0",
    avance: "0", // Ajouté pour l'état d'avance
  });
  const [modePaye, setModepaye] = useState("integral");

async function chargerReservation(){
    try {
      const data = await fonction.listerReservation();
      console.log(data)
      setListreservation(data);
      setErreur("");
    }catch (error){
      setErreur("impossible de charger les voitures")
      console.log(error)
    }
  }

  useEffect (()=>{chargerReservation();},[])

useEffect(() => {
    async function recupererPlacesOccupees() {
        if (!reservation.datevoyage) return; // Ne rien faire si aucune date n'est sélectionnée
        try {
            const places = await fonction.listerPlacesParDate(reservation.datevoyage);
            setPlaceoccupe(places); // On stocke les places récupérées dans l'état
        } catch (error) {
            setErreur("Impossible de charger les places occupées");
        }
    }
    recupererPlacesOccupees();
}, [reservation.datevoyage]); // S'exécute à chaque fois que la variable 'date' change
  
  async function chargerVoiture(){
    try {
      const data = await fonction.listervoiture();
      setVoitures(data);
      setErreur("");
    }catch (error){
      setErreur("impossible de charger les voitures")
    }
  }

  useEffect (()=>{chargerVoiture();},[])

  // Fonction pour préparer et valider la réservation
  async function preparerReservation() {
    try {
      if (!client.nom || !client.contact) {
        alert("Veuillez remplir le nom et le contact du client.");
        return;
      }

      // Recherche ou création automatique du client (géré par fonction.id)
      const idClient = await fonction.id(client);

      if (!idClient) {
        throw new Error("Impossible d'identifier ou de créer le client.");
      }

      // Mise à jour de la réservation avec l'ID du client trouvé/créé
      setReservation((prev) => ({
        ...prev,
        idclient: idClient,
        classs: classs,
      }));

      // Activation de l'affichage de l'écran de paiement
      setReserver(true);
    } catch (error) {
      console.error("Erreur lors de la préparation :", error);
      alert("Erreur lors de la récupération ou création du client : " + error.message);
    }
  }

  // Fonction finale pour soumettre la réservation au backend
  async function finaliserReservation() {
    try {
      // Ajustement des données de paiement avant l'envoi
      const reservationFinale = {
        ...reservation,
        payement: modePaye,
        avance: modePaye === "avance" ? Number(reservation.avance || 0) : 0,
      };

      await fonction.reserver(reservationFinale);
      alert("Réservation réussie !");
      setReserver(false);
    } catch (error) {
      alert("Erreur lors de la réservation : " + error.message);
    }
  }
  
      const voituresFiltrees = voitures.filter(
			(voiture) => voiture.typevoit.toLowerCase() === reservation.classs.toLowerCase()
		);

  // Rendu de l'étape de confirmation (Paiement)
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
            <p>Classe</p><p className="reponse">{reservation.classs}</p>
            <p>Voiture</p><p className="reponse">{reservation.idvoit}</p>
            <p>Place</p><p className="reponse">{reservation.place}</p>
            <p>Date</p><p className="reponse">{reservation.datevoyage}</p>
          </div>
          <div className="Payement">
            <p>id voyage:</p>
            <input
              type="text"
              value={reservation.idreservation}
              onChange={(e) => setReservation({ ...reservation, idreservation: e.target.value })}
            /><br/>
            {modePaye === "avance" && (
              <>
                <p>Avance:</p>
                <input
                  type="number"
                  value={reservation.avance}
                  onChange={(e) => setReservation({ ...reservation, avance: e.target.value })}
                />
              </>
            )}

            {(modePaye === "avance" || modePaye === "Npaye") && (
              <p>Reste à payer: {reservation.reste}</p>
            )}

            <button onClick={finaliserReservation}>Réserver</button>
            <button onClick={() => setReserver(false)}>Annuler</button>
          </div>
        </div>
      </>
    );
  }


 else if (liste){
    return<>
        <h2>RESERVATION</h2>
                  <br/>
        <button onClick={()=>setListe(false)}>Reserver</button><br/>

        <div className="contener">
		{
		listreservation.map((reservation)=>(<div className="carte" key={reservation.idreserv}>
			<p>reservation :</p><p>{reservation.idreserv}</p>
			<p>voitture :</p><p>{reservation.idvoit}</p>
			<p>place :</p><p>{reservation.place}</p>
			<p>date :</p><p>{reservation.datevoyage}</p>
		</div>))
		}
		</div>
      
      </>



 }
  // Rendu du formulaire de base
  return (
    <>
      <h2>RESERVATION</h2>
      <br/>
      <button onClick={()=>setListe(true)}>Liste</button><br/>
      <div className="iresersvation">
        <div className="dateC">
          <div className="dateclass">
            <label htmlFor="dateV">Date de voyage : </label>
            <br />
            <label htmlFor="classV">Classe : </label>
          </div>
          <div className="idateclass">
            <input
              type="date"
              id="dateV"
              onChange={(v) => setReservation({ ...reservation, datevoyage: v.target.value })}
            />
            <br />
            <select id="classV" onChange={(e) => setReservation({...reservation, classs: e.target.value})}>
              <option value="Classic">Classic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
            <br />
            <br />
          </div>
        </div>
        <div className="formplace">
          <div className="placenom">
            <label htmlFor="iname">Nom : </label>
            <br />
            <label htmlFor="inum">Contact : </label>
            <br />
            <label htmlFor="ivoit">Voiture :</label>
            <br />
            <label htmlFor="iplace">Place : </label>
            <br />
          </div>
          <div className="iplacenom">
            <input
              type="text"
              id="iname"
              onChange={(e) => setClient({ ...client, nom: e.target.value })}
            />
            <br />
            <input
              type="text"
              id="inum"
              onChange={(e) => setClient({ ...client, contact: e.target.value })}
            />
            <br />
            <input
              type="text"
              id="ivoit"
              onChange={(e) => setReservation({ ...reservation, idvoit: e.target.value })}
            />
            <br />
            <input
              type="text"
              id="iplace"
              onChange={(e) => setReservation({ ...reservation, place: e.target.value })}
            />
            <br />
          </div>
        </div>
        <button id="reservebutton" onClick={preparerReservation}>
          RESERVER
        </button>
        </div>

{/*//BASE RECHERCHE DE DISPONIBILITE DE PLACE*/}
 
			<div className="contener">
				{/* On boucle sur les voitures filtrées du type choisi */}
				{voituresFiltrees.map((voiture) => (
					<div key={voiture.idvoit} className="bloc-voiture-places" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px",height:"fit-content" }}>
						<h4>Matricule : {voiture.idvoit} ({voiture.design})</h4>

							{reservation.classs === "Classic" && <PlaceC voiture={voiture} placesOccupees={placeoccupe} />}
							{reservation.classs === "Premium" && <PlaceP voiture={voiture} placesOccupees={placeoccupe} />}
							{reservation.classs === "VIP" && <PlaceV voiture={voiture} placesOccupees={placeoccupe} />}
				
					</div>  
				))}
			</div>
    </>
  );
}

export default Reservation;