import { useState } from "react";
import Confirmer from "./Confirner";
import * as fonction from "./Functions"

function Voiture (){
	return <>
		<h2>VOITURE</h2>
		<button className="nouveauvoit"> + ajouter </button>
		<div className="carte">
			<p>id</p>
			<p>designation</p>
			<p>type</p>
			<p>nbplace</p>
			<p>frais</p>
			<button>Modifier</button><br/>
			<button>Place</button><br/>
			<button>Suprimer</button>
		</div>
		<Confirmer/>
		<ModVoiture/>
	</>
}

function ModVoiture(){

	const[designation,setDesignation]=useState("")
	const[type,setType]=useState("")
	const[frais,setFrais]=useState("")

	return <>
		<div className="carte">
			<p>id</p>
			<p>designation</p><input type="text" className='Imodification'  onChange={(d)=> setDesignation(d.value)}/>
			<p>type</p><input type="text" className='Imodification'  onChange={(t)=> setType(t.value)}/>
			<p>nbplace</p>
			<p>frais</p><input type="text" className='Imodification'  onChange={(f)=> setFrais(f.value)}/>
			<button>Confirmer</button><br/>
			<button>Annuler</button><br/>
		</div>
	</>
}

export default Voiture;