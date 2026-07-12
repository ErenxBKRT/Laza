import { useRef, useState } from "react"
import * as fonction from "./Functions"
import PlaceC from "./PlaceC"
import PlaceP from "./PlaceP"
import PlaceV from "./PlaceV"

function Reservation (){

	const [dateR,setDateR]= useState("")
	const [classs,setClass]= useState("")

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
				<Inputclient/>
				<button id="reservebutton">RESERVER</button>
			</div>
		<VoitureDispo/>
	</>
}

function VoitureDispo (){

	return <>
		<div className="voituredispo">
			<p>num voiture dispo</p>
			<PlaceC/>
			<PlaceP/>
			<PlaceV/>
		</div>
	</>

}

function Inputclient (){
	const [name, setName] = useState("")
	const [num, setNum] = useState("")
	const [voit, setVoit] = useState("")
	const [place, setPlace] = useState("")

	return <>
	<div className="formplace">
		<div className="placenom">
			<label for="iname">Nom : </label><br/>
			<label for="inum">Contact : </label><br/>
			<label for="ivoit">Voiture :</label><br/>
			<label for="iplace">Place : </label><br/>
		</div>
		<div className="iplacenom">
			<input type="text" id="iname" value={name} onChange={(newName) => setName(newName.value)}/><br/>
			<input type="text" id="inum" value={num} onChange={(newNum) => setNum(newNum.value)}/><br/>
			<input type="text" id="ivoit" value={voit} onChange={(newVoit) => setVoit(newVoit.value)}/><br/>
			<input type="text" id="iplace" value={place} onChange={(newPlace) =>setPlace(newPlace.value)}/><br/>
		</div>
	</div>
	</>		
}

export default Reservation;