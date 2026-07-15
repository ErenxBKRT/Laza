import { useEffect, useState } from "react";
import Confirmer from "./Confirner";
import * as fonction from "./Functions"
import PlaceC from "./PlaceC"
import PlaceP from "./PlaceP"
import PlaceV from "./PlaceV"

function Voiture (){

	const [voitures,setVoitures]= useState([])
	const [erreur,setErreur]= useState("")
	const [voituremodifier,setVoituremodifier]= useState(null)
	const [voituresup,setVoituresup]= useState(null)
	const [supprimer,setSupprimer]=useState(false)
	const [newvoit,setNewvoit]=useState({idvoit:"",design:"Crafter",typevoit:"Classic",nbrplace:"16",frais:50000})
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const [action,setAction]=useState("information")
	const [typeplace,setTypeplace]=useState("classic")
	const [placeoccupe,setPlaceoccupe]=useState([])

	// Charger les places occupées lorsque la date change
useEffect(() => {
    async function recupererPlacesOccupees() {
        if (!date) return; // Ne rien faire si aucune date n'est sélectionnée
        try {
            const places = await fonction.listerPlacesParDate(date);
            setPlaceoccupe(places); // On stocke les places récupérées dans l'état
        } catch (error) {
            setErreur("Impossible de charger les places occupées");
        }
    }
    recupererPlacesOccupees();
}, [date]); // S'exécute à chaque fois que la variable 'date' change
	
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

	async function confirmerModification(voiture) {
    try {
        // On crée l'objet complet prêt à être envoyé à l'API
        // Si 'newid' n'a pas été modifié par l'input, on garde l'id initial
        const voitureMiseAJour = {
            ...voiture,
            newid: voiture.newid || voiture.idvoit 
        };

        // On envoie cet objet à jour directement à l'API
        await fonction.modifiervoiture(voitureMiseAJour);
        
        // On rafraîchit la liste et on ferme le formulaire
        await chargerVoiture();
        setVoituremodifier(null);
        setErreur("");
    } catch (error) { 
        setErreur("impossible de modifier cette voiture");
    }
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
			<button onClick={() => confirmerModification(voituremodifier)}>Modifier</button>
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

	else if (action==="ajouter"){
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

	else if (action==="places"){
		// On filtre le tableau `voitures` pour obtenir uniquement celles qui ont le type sélectionné.
		// On utilise .toLowerCase() pour s'assurer que la comparaison fonctionne (ex: "Classic" vs "classic").
		const voituresFiltrees = voitures.filter(
			(voiture) => voiture.typevoit.toLowerCase() === typeplace.toLowerCase()
		);

		return <>
			<h2>VOITURE</h2>
			<h3>Places</h3>

			<button onClick={() => setAction("information")}>Informations</button><br/>
			<button onClick={()=> setAction("ajouter")}> + ajouter </button>
			<button onClick={() => setAction("places")}> places</button><br/>
		
			<select value={typeplace} onChange={(a) => setTypeplace(a.target.value)}>
						<option value="classic">Classic</option>
						<option value="premium">Premium</option>
						<option value="VIP">VIP</option>
			</select>
			<input type="date" value={date} onChange={(e) => setDate(e.target.value)}/><br/>
			<div className="contener">
				{/* On boucle sur les voitures filtrées du type choisi */}
				{voituresFiltrees.map((voiture) => (
					<div key={voiture.idvoit} className="bloc-voiture-places" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px",height:"fit-content" }}>
						<h4>Matricule : {voiture.idvoit} ({voiture.design})</h4>

							{typeplace === "classic" && <PlaceC voiture={voiture} placesOccupees={placeoccupe} />}
							{typeplace === "premium" && <PlaceP voiture={voiture} placesOccupees={placeoccupe} />}
							{typeplace === "VIP" && <PlaceV voiture={voiture} placesOccupees={placeoccupe} />}
				
					</div>
				))}
			</div>
		</>
	}
	
	return <>
		<h2>VOITURE</h2>
		<button onClick={() => setAction("information")}>Informations</button><br/>
		<button onClick={()=> setAction("ajouter")}> + ajouter </button>
		<button onClick={() => setAction("places")}> places</button><br/>
		<div className="contener">
		{
		voitures.map((voiture)=>(<div className="carte" key={voiture.idvoit}>
			<p>matricule:{voiture.idvoit}</p>
			<p>design:{voiture.design}</p>
			<p>type:{voiture.typevoit}</p>
			<p>place:{voiture.nbrplace}</p>
			<p>frais:{voiture.frais}</p>
			<button onClick={() => setVoituremodifier({ ...voiture, newid: voiture.idvoit })}>Modifier</button><br/>
			<button onClick={() => setVoituresup(voiture)}>Supprimer</button>
		</div>))
		}
		</div>
	</>
}

export default Voiture;