import { useEffect, useState } from 'react';
import '../style/Profit.css'
import * as fonction from "./Functions";

function Profit (){

	const [date1,setDate1]=useState("")
	const [erreur,setErreur]=useState("")
	const [date2,setDate2]=useState("")
	const [profit,setProfit]=useState(0)
	const [placeC,setPlaceC]=useState(0)
	const [placeP,setPlaceP]=useState(0)
	const [placeV,setPlaceV]=useState(0)

async function getP(){
	try{
		let C=await fonction.voirprofitC(date1,date2)
		let P=await fonction.voirprofitP(date1,date2)
		let V=await fonction.voirprofitV(date1,date2)
		let G=await fonction.profitG(date1,date2)
		setPlaceC(C.count)
		setPlaceP(P.count)
		setPlaceV(V.count)
		setProfit(G[0].total)
	}catch(error){
		setErreur("impossible")
		console.log(error)
	}
}

useEffect(()=>{getP();},[date1,date2])

	return <>
		<h2>PROFIT</h2>
		<div className='profit'>
		<div className="periodeRevenu">
			<div className="periode">
				<p>entre</p>
				<input type="date" onChange={(e)=>setDate1(e.target.value)}/>
				<p>et</p>
				<input type="date" onChange={(e)=>setDate2(e.target.value)}/>
			</div>
			<div className="revenu">
				<h2>REVENUE FINAL</h2>
				<p>{profit}</p>
			</div>
		</div>
		<div className="placeVendu">
			<h3>Nombre de place vendu</h3>
			<p>Classic :{placeC}</p>
			<p>Premium :{placeP}</p>
			<p>VIP :{placeV}</p>
		</div>
		</div>
	</>
}

export default Profit;