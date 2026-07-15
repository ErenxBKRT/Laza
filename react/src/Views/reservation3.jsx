

//---------------------------------------

import { useRef, useState } from "react"
import * as fonction from "./Functions"
import PlaceC from "./PlaceC"
import PlaceP from "./PlaceP"
import PlaceV from "./PlaceV"

function Reservation (){

    const [voiture,setVoiture]= useState([])
    const [classs,setClass]= useState("")
    const [reserver,setReserver]= useState(false)
    const [client,setClient]= useState({nom:"",contact:""})
    const [reservation,setReservation]= useState({
        idreservation:"",
        idclient:"",
        idvoit:"",
        place:"",
        datevoyage:"",
        classs:"Classic",
        frais:"",reste:"0"})
    const [modePaye,setModepaye]=useState("integral")

    async function preparerReservation() {
    const id = await fonction.id(client);

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

    setReservation({
        ...reservation,
        idclient: id
    });

    setReserver(true);
}

    if (reserver && modePaye==="integral"){
        return <>
        <h2>RESERVATION</h2><br/>
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
                <input type="text" onChange={(e)=> setReservation({...reservation,idreservation:e.target.value})} />
                <p>Mode de payement</p>
                <select value={modePaye} onChange={(a) => setModepaye(a.target.value)}>
                        <option value="integral">Tout paye</option>
                        <option value="avance">Avec avance</option>
                        <option value="Npaye">Sans avance</option>
            </select>
            <button onClick={() => fonction.reserver(reservation)}>Reserver</button>
                <button onClick={()=>setReserver(false)}>Annuler</button>
            </div>
        </div>
        </>
    }


    if (reserver && modePaye==="avance"){
        return <>
        <h2>RESERVATION</h2><br/>
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
                <input type="text" onChange={(e)=> setReservation({...reservation,idreservation:e.target.value})} />
                <p>Mode de payement</p>
                <select value={modePaye} onChange={(a) => setModepaye(a.target.value)}>
                        <option value="integral">Tout paye</option>
                        <option value="avance">Avec avance</option>
                        <option value="Npaye">Sans avance</option>
                </select>
                <p>Avance:</p><input type="text"></input>
                <p>Reste a paye: {}</p>
                <button onClick={() => fonction.reserver(reservation)}>Reserver</button>
                <button onClick={()=>setReserver(false)}>Annuler</button>
            </div>
        </div>
        </>
    }

    
    if (reserver && modePaye==="Npaye"){
        return <>
        <h2>RESERVATION</h2><br/>
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
                <input type="text" onChange={(e)=> setReservation({...reservation,idreservation:e.target.value})} />
                <p>Mode de payement</p>
                <select value={modePaye} onChange={(a) => setModepaye(a.target.value)}>
                        <option value="integral">Tout paye</option>
                        <option value="avance">Avec avance</option>
                        <option value="Npaye">Sans avance</option>
                </select>
                <p>Reste a paye: {}</p>
                <button onClick={() => fonction.reserver(reservation)}>Reserver</button>
                <button onClick={() => setReserver(false)}>Annuler</button>
            </div>
        </div>
        </>
    }

    return <>
        <h2>RESERVATION</h2><br/>
            <div className="iresersvation">
                <div className="dateC">
                <div className="dateclass">
                    <label for="dateV">Date de voyage :   </label><br/>
                    <label for="classV">Classe :   </label>
                </div>
                <div className="idateclass">
                    <input type="date" id="dateV" onChange={(v) => setReservation({...reservation,datevoyage:v.target.value})}/><br/>
                    <select id="classV" onChange={(a) => setClass(a.target.value)}>
                        <option value="classic">Classic</option>
                        <option value="premium">Premium</option>
                        <option value="VIP">VIP</option>
                    </select><br/><br/>
                </div>
                </div>
                    <div className="formplace">
                        <div className="placenom">
                            <label for="iname">Nom : </label><br/>
                            <label for="inum">Contact : </label><br/>
                            <label for="ivoit">Voiture :</label><br/>
                            <label for="iplace">Place : </label><br/>
                        </div>
                    <div className="iplacenom">
                        <input type="text" id="iname" onChange={(e) => setClient({...client,nom:e.target.value})}/><br/>
                        <input type="text" id="inum" onChange={(e) => setClient({...client,contact:e.target.value})}/><br/>
                        <input type="text" id="ivoit" onChange={(e) => setReservation({...reservation,idvoit:e.target.value})}/><br/>
                        <input type="text" id="iplace" onChange={(e) => setReservation({...reservation,place:e.target.value})}/><br/>

                    </div>
                    </div>
                    <button id="reservebutton" onClick={() => setReserver(true)} onClick={()=>preparerReservation()}>RESERVER</button>
            </div>
    </>
}

export default Reservation;