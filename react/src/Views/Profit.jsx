import '../style/Profit.css'

function Profit (){
	return <>
		<h2>PROFIT</h2>
		<div className="periodeRevenu">
			<div className="periode">
				<p>entre</p>
				<input type="date"/>
				<p>et</p>
				<input type="date"/>
			</div>
			<div className="revenu">
				<h2>REVENUE FINAL</h2>
				<p>1000000 Ar</p>
			</div>
		</div>
		<div className="placeVendu">
			<h3>Nombre de place vendu</h3>
			<p>Classic :</p>
			<p>Premium :</p>
			<p>VIP :</p>
		</div>
		<h2>Total entrée :</h2>
		<p>5200000</p>
		<div className="depense">
			<h3>Depense</h3>
			<p>Gasoil(5%):</p>
			<p>Entretien(12%):</p>
			<p>Employer(61%):</p>
			<p>Divers(1%):</p>
		</div>
	</>
}

export default Profit;