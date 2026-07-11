import { useState, useEffect } from 'react';
import '../style/Client.css'
import Confirmer from './Confirner';
import * as fonction from "./Functions"

function Client (){

	const [clients, setClients] = useState([]);
	const [clientModifier, setClientModifier] = useState(null);
	const [clientSupprimer, setClientSupprimer] = useState(null);
	const [ajouter, setAjouter] = useState(false);
	const [recherche, setRecherche] = useState("");
	const [erreur, setErreur] = useState("");

	async function chargerClients() {
		try {
			const data = await fonction.listerClient();
			setClients(data);
			setErreur("");
		} catch (error) {
			setErreur("Impossible de charger les clients");
		}
	}

	useEffect(() => {chargerClients();}, []);

	async function confirmerModification(client) {
		try {
			await fonction.modifierclient(client.idclient, client.nom, client.numtel);
			await chargerClients();
			setClientModifier(null);
			setErreur("");
		} catch (error) {
			setErreur("Impossible de modifier ce client");
		}
	}

	async function confirmerAjout(client) {
		try {
			await fonction.ajouterclient(client.nom, client.numtel);
			await chargerClients();
			setAjouter(false);
			setErreur("");
		} catch (error) {
			setErreur("Impossible d'ajouter ce client");
		}
	}

	async function confirmerSuppression(client) {
		try {
			await fonction.supprimerclient(client.idclient);
			await chargerClients();
			setClientSupprimer(null);
			setErreur("");
		} catch (error) {
			setErreur("Impossible de supprimer ce client");
		}
	}

	const texteRecherche = recherche.trim().toLowerCase();
	const clientsAffiches = clients.filter((client) => {
		if (!texteRecherche) {
			return true;
		}

		return (
			client.nom.toLowerCase().includes(texteRecherche) ||
			client.numtel.toLowerCase().includes(texteRecherche)
		);
	});

	if(!clientModifier && !ajouter){
		return <>
		<h2>CLIENT</h2>
		<div className="recherchecli">
			<input
				type="search"
				value={recherche}
				onChange={(event) => setRecherche(event.target.value)}
				placeholder="Rechercher un client"
			/>
			<button className="btnrecherchecli">Rechercher</button>
		</div>
		<button className="nouveaucli" onClick={() => {
			setAjouter(true);
			setClientSupprimer(null);
		}}> + ajouter </button>
		{erreur && <p>{erreur}</p>}
		{clientSupprimer && (
			<Confirmer
				message={`Supprimer le client ${clientSupprimer.nom} ?`}
				onConfirmer={() => confirmerSuppression(clientSupprimer)}
				onAnnuler={() => setClientSupprimer(null)}
			/>
		)}
		<div className='contener'>
		{clientsAffiches.map((client) => (
        <div className="carte" key={client.idclient}>
          <p>{client.idclient}</p>
          <p>{client.nom}</p>
          <p>{client.numtel}</p>

		  <button onClick={() => {
			setClientModifier(client);
			setClientSupprimer(null);
		  }}>Modifier</button>
		  <button onClick={() => setClientSupprimer(client)}>Supprimer</button>
        </div>
      ))}</div>
		</>
	}

	if (ajouter) {
		return <>
		<h2>CLIENT</h2>
			{erreur && <p>{erreur}</p>}
			<AjoutClient
				onConfirmer={confirmerAjout}
				onAnnuler={() => setAjouter(false)}
			/>
		</>
	}

	else {
		return <>
		<h2>CLIENT</h2>
		<h3>Modification</h3>
			{erreur && <p>{erreur}</p>}
			<ModClient
				client={clientModifier}
				onConfirmer={confirmerModification}
				onAnnuler={() => setClientModifier(null)}
			/>
		</>
	}
	
}

function AjoutClient ({ onConfirmer, onAnnuler }){

	const[nom,setNom]=useState("")
	const[numtel,setNumtel]=useState("")

	function envoyerAjout(event) {
		event.preventDefault();

		onConfirmer({
			nom,
			numtel,
		});
	}

	return<>
	<form className="ajout" onSubmit={envoyerAjout}>
		<p>nom</p><input type='text' className='Imodification' value={nom} onChange={(n) => setNom(n.target.value) }/>
		<p>numtel</p><input type='text' className='Imodification' value={numtel} onChange={(nu) => setNumtel(nu.target.value)}/>
		<button type="submit">Confirmer</button><br/>
		<button type="button" onClick={onAnnuler}>Annuler</button><br/>
	</form>	
	</>
}

function ModClient ({ client, onConfirmer, onAnnuler }){

	const[nom,setNom]=useState(client.nom)
	const[numtel,setNumtel]=useState(client.numtel)

	function envoyerModification(event) {
		event.preventDefault();

		onConfirmer({
			...client,
			nom,
			numtel,
		});
	}

	return<>
	<form className="modification" onSubmit={envoyerModification}>
		<p>id : {client.idclient}</p><br/>
		<p>nom</p><input type='text' className='Imodification' value={nom} onChange={(n) => setNom(n.target.value) }/><br/>
		<p>numtel</p><input type='text' className='Imodification' value={numtel} onChange={(nu) => setNumtel(nu.target.value)}/><br/>
		<button type="submit">Confirmer</button>
		<button type="button" onClick={onAnnuler}>Annuler</button><br/>
	</form>	
	</>
}

export default Client;
