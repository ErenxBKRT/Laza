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
	const [newvoit,setNewvoit]=useState({idvoit:"",design:"Crafter",typevoit:"Classic",nbrplace:"16",frais:50000})

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
			setVoituremodifier({...voituremodifier,newid: voituremodifier.idvoit});
			await fonction.modifiervoiture(voiture);
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

	async function confirmerAjout(newvoit) {
		try {
			await fonction.ajoutervoiture(newvoit);
			await chargerVoiture();
			setAjouter(false);
			setNewvoit({idvoit:"",design:"",typevoit:"",nbrplace:"",frais:0});
			setErreur("");
		} catch (error) {
			setErreur("Impossible d'ajouter la voiture");
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
				onAnnuler={() => setVoituresup(null)}
			/>	
		
		</>
	}

	else if (ajouter){
		return <>
			<h2>VOITURE</h2>
			<h3>Ajouter une voiture</h3>
			<div className="ajout">
				<div className="ajoutA">
					<form>
						<p>Matricule:</p>
							<input type="texte" placeholder="Matricule" onChange={(e) => setNewvoit({...newvoit,idvoit:e.target.value})}/>
						<p>Design:</p>
							<select onChange={(e) => setNewvoit({...newvoit,
								design:e.target.value,
								nbrplace:e.target.value==="Crafter"?"16":e.target.value==="Sprinter"?"16":e.target.value==="Starex"?"9":e.target.value==="Hiace"?"9":e.target.value==="I30"?"3":"3",
								typevoit:e.target.value==="Crafter"?"Classic":e.target.value==="Sprinter"?"Classic":e.target.value==="Starex"?"Premium":e.target.value==="Hiace"?"Premium":e.target.value==="I30"?"VIP":"VIP"})}>
								<option value="Crafter">Crafter</option>
								<option value="Sprinter">Sprinter</option>
								<option value="Starex">Starex</option>
								<option value="Hiace">Hiace</option>
								<option value="I30">I30</option>
								<option value="Corolla">Corolla</option>
							</select>
						<p>Type:</p>
							<p>{newvoit.typevoit}</p>
						<p>Place:</p>
							<p>{newvoit.nbrplace}</p>
						<p>frais:</p>
							<input type="number" defaultValue="50000" onChange={(e) => setNewvoit({...newvoit,frais:e.target.value})}/><br/>
						<button onClick={()=>confirmerAjout(newvoit)}>Confirmer</button><br/>
						<button onClick={()=>setAjouter(false)}>Annuler</button>
					</form>
				</div>
			</div>
		</>
	}
	
	return <>
		<h2>VOITURE</h2>
		<button className="nouveauvoit" onClick={()=>setAjouter(true)}> + ajouter </button>
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