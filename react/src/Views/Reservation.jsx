import { useRef, useState } from "react"
import * as fonction from "./Functions"
import PlaceC from "./PlaceC"
import PlaceP from "./PlaceP"
import PlaceV from "./PlaceV"

function Reservation (){

	const [voiture,setVoiture]= useState([])
	const [dateR,setDateR]= useState("")
	const [classs,setClass]= useState("")
	const [reserver,setReserver]= useState(false)
	const [reservation,setReservation]= useState({nom:"",contact:"",idvoit:"",idplace:"",datevoyage:"",classs:"Classic",frais:"",reste:"0"})
	const [modePaye,setModepaye]=useState("integral")

	if (reserver && modePaye==="integral"){
		return <>
		<h2>RESERVATION</h2><br/>
		<h3>Mode de payement</h3>
		<div className="ModePaye">
			<div className="carte">
				<p>Nom</p><p className="reponse">{reservation.nom}</p>
				<p>Contact</p><p className="reponse">{reservation.contact}</p>
				<p>Classe</p><p className="reponse">{reservation.classs}</p>
				<p>Voiture</p><p className="reponse">{reservation.idvoit}</p>
				<p>Place</p><p className="reponse">{reservation.idplace}</p>
				<p>Date</p><p className="reponse">{reservation.datevoyage}</p>
			</div>
			<div className="Payement">
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
				<p>Nom</p><p className="reponse">{reservation.nom}</p>
				<p>Contact</p><p className="reponse">{reservation.contact}</p>
				<p>Classe</p><p className="reponse">{reservation.classs}</p>
				<p>Voiture</p><p className="reponse">{reservation.idvoit}</p>
				<p>Place</p><p className="reponse">{reservation.idplace}</p>
				<p>Date</p><p className="reponse">{reservation.datevoyage}</p>
			</div>
			<div className="Payement">
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
				<p>Nom</p><p className="reponse">{reservation.nom}</p>
				<p>Contact</p><p className="reponse">{reservation.contact}</p>
				<p>Classe</p><p className="reponse">{reservation.classs}</p>
				<p>Voiture</p><p className="reponse">{reservation.idvoit}</p>
				<p>Place</p><p className="reponse">{reservation.idplace}</p>
				<p>Date</p><p className="reponse">{reservation.datevoyage}</p>
			</div>
			<div className="Payement">
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
					<input type="date" id="dateV" value={dateR} onChange={(v) => setDateR(v.target.value)}/><br/>
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
						<input type="text" id="iname" onChange={(e) => setReservation({...reservation,nom:e.target.value})}/><br/>
						<input type="text" id="inum" onChange={(e) => setReservation({...reservation,contact:e.target.value})}/><br/>
						<input type="text" id="ivoit" onChange={(e) => setReservation({...reservation,idvoit:e.target.value})}/><br/>
						<input type="text" id="iplace" onChange={(e) => setReservation({...reservation,idplace:e.target.value})}/><br/>
					</div>
					</div>
					<button id="reservebutton" onClick={() => setReserver(true)}>RESERVER</button>
			</div>
		<VoitureDispo date={dateR} class={classs}/>
	</>
}

function VoitureDispo (date,classs){

	const [voiture,setVoiture]= useState([])

	async function chargerVoiture(){
		try {
			const data = await fonction.listervoiture();
			setVoitures(data);
			setErreur("");
		}catch (error){
			setErreur("impossible de charger les voitures")
		}
	}
	return <>
		<div className="contener">
			{
				voiture.map((Voiture) => (
				<p>{Voiture.idvoit}</p>
			))}
		</div>
	</>

}

export default Reservation;