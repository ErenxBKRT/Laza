import { useEffect, useState } from "react";
import Confirmer from "./Confirner";
import * as fonction from "./Functions"

function Voiture (){

	const [voitures,setVoitures]= useState([])
	const [erreur,setErreur]= useState("")
	const [voituremodifier,setVoituremodifier]= useState(null)
	const [voituresup,setVoituresup]= useState(null)
	const [ajouter,setAjouter]=useState(false)
	const [supprimer,setSupprimer]=useState(false)

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

	async function confirmerModification(voiture){
		try {
			await fonction.modifiervoiture(voiture.idvoit, voiture.frais, voiture.newid);
			await chargerVoiture();
			setVoituremodifier(null);
			setErreur("");
		} catch (error){ setErreur("impossible de modifier cette voiture")}
	}

	async function confirmerSuppression(voiture) {
			try {
				await fonction.supprimervoiture(voiture.idvoit);
				await chargerVoiture();
				setVoituresup(null);
				setErreur("");
			} catch (error) {
				setErreur("Impossible de supprimer le voiture");
			}
		}

	if (voituremodifier!=null){
		return<>
		<h2>VOITURE</h2>
		<h3>Modification</h3>
		<div className="modification">
			<p>Matricule:</p><p>{voituremodifier.idvoit}</p><input type="texte" className="modificationInput" defaultValue={voituremodifier.idvoit} onChange={(e)=>setVoituremodifier({...voituremodifier,newid:e.target.value})}/>
			<p>Design:</p><p>{voituremodifier.design}</p>
			<p>Type:</p><p>{voituremodifier.typevoit}</p>
			<p>Place:</p><p>{voituremodifier.nbrplace}</p>
			<p>frais:</p><p>{voituremodifier.frais}</p><input type="texte" className="modificationInput" defaultValue={voituremodifier.frais} onChange={(e)=>setVoituremodifier({...voituremodifier,frais:e.target.value})}/><br/>
			<button onClick={()=>confirmerModification(voituremodifier)}>Confirmer</button>
			<button onClick={()=>setVoituremodifier(null)}>Annuler</button>
		</div>
	</>
	}

	else if (voituresup!=null){
		return<>
			<h2>VOITURE</h2>
			<Confirmer
				message={`Supprimer la voiture ${voituresup.idvoit} ?`}
				onConfirmer={() => confirmerSuppression(voituresup)}
				onAnnuler={() => setvoitureSupprimer(null)}
			/>	
		
		</>
	}

	else if (ajouter){
		return <>
			
		
		
		</>
	}
	
	return <>
		<h2>VOITURE</h2>
		<button className="nouveauvoit"> + ajouter </button>
		<div className="contener">
		{
		voitures.map((voiture)=>(<div className="carte" key={voiture.idvoit}>
			<p>matricule:{voiture.idvoit}</p>
			<p>design:{voiture.design}</p>
			<p>type:{voiture.typevoit}</p>
			<p>place:{voiture.nbrplace}</p>
			<p>frais:{voiture.frais}</p>
			<button onClick={() => setVoituremodifier(voiture)}>Modifier</button><br/>
			<button>Place</button><br/>
			<button onClick={() => setVoituresup(voiture)}>Supprimer</button>
		</div>))
		}
		</div>
	</>
}

export default Voiture;