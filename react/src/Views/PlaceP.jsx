import '../style/place.css'
import PlaceButton from './PlaceButton';

function PlaceP ({ voiture, placesOccupees }) {

    // On vérifie si la place est réservée
   const estOccupee = (numPlace) => {
    if (!placesOccupees || !voiture) return false;
    
    return placesOccupees.some((p) => {
        // Gérer aussi bien 'idvoit' que 'IDVOIT'
        const dbIdvoit = p.idvoit;
        // Gérer aussi bien 'place' que 'PLACE'
        const dbPlace = p.place !== undefined ? p.place : p.PLACE;

        return dbIdvoit.trim().toLowerCase() == voiture.idvoit.trim().toLowerCase() && 
               String(dbPlace).trim() == String(numPlace).trim();
    });
};

    return <>
        <div className="PlaceP">
            <button className="cc">c</button>
            <button className="cc">o</button>

            {/* On ajoute la prop occupe */}
            <PlaceButton num="1" occupe={estOccupee("1")} /><br/><br/>
            
            <PlaceButton num="2" occupe={estOccupee("2")}/>
            <PlaceButton num="3" occupe={estOccupee("3")}/>
            <PlaceButton num="4" occupe={estOccupee("4")}/><br/><br/>
            
            <PlaceButton num="5" occupe={estOccupee("5")}/>
            <button className="cc">|  |</button>
            <PlaceButton num="6" occupe={estOccupee("6")}/><br/><br/>
            
            <PlaceButton num="7" occupe={estOccupee("7")}/>
            <PlaceButton num="8" occupe={estOccupee("8")}/>
            <PlaceButton num="9" occupe={estOccupee("9")}/>
        </div>
    </>
}

export default PlaceP;