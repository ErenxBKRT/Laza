import PlaceButton from "./PlaceButton";

function PlaceV ({ voiture, placesOccupees }){
    
    const estOccupee = (numPlace) => {
    if (!placesOccupees || !voiture) return false;
    
    return placesOccupees.some((p) => {
        // Gérer aussi bien 'idvoit' que 'IDVOIT'
        const dbIdvoit = p.idvoit || p.IDVOIT || "";
        // Gérer aussi bien 'place' que 'PLACE'
        const dbPlace = p.place !== undefined ? p.place : p.PLACE;

        return dbIdvoit.trim().toLowerCase() === voiture.idvoit.trim().toLowerCase() && 
               String(dbPlace).trim() === String(numPlace).trim();
    });
};
    return<>
        <div className="PlaceV">
            <button className="cc">c</button>
            <PlaceButton num="1" occupe={estOccupee("1")}/><br/><br/>           
            <PlaceButton num="2" occupe={estOccupee("2")}/>
            <PlaceButton num="3" occupe={estOccupee("3")}/>
        </div>
    </>
}

export default PlaceV;