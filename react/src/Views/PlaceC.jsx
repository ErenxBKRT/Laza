import '../style/place.css'
import PlaceButton from './PlaceButton';

function PlaceC({ voiture, placesOccupees }) {

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
    return (
        <>
            <div className='placeC'>
                <button className="cc">c</button>
                <button className="cc">o</button>

                {/* On passe l'information "occupe" à chaque bouton sans changer votre disposition */}
                <PlaceButton num="1" occupe={estOccupee("1")} />
                <PlaceButton num="2" occupe={estOccupee("2")} /><br /><br />
                
                <PlaceButton num="3" occupe={estOccupee("3")} />
                <PlaceButton num="4" occupe={estOccupee("4")} />
                <PlaceButton num="5" occupe={estOccupee("5")} />
                <PlaceButton num="6" occupe={estOccupee("6")} /><br /><br />
                
                <PlaceButton num="7" occupe={estOccupee("7")} />
                <PlaceButton num="8" occupe={estOccupee("8")} />

                <button className="cc">|  |</button>

                <PlaceButton num="9" occupe={estOccupee("9")} /><br /><br />
                
                <PlaceButton num="10" occupe={estOccupee("10")} />
                <PlaceButton num="11" occupe={estOccupee("11")} />

                <button className="cc">|  |</button>

                <PlaceButton num="12" occupe={estOccupee("12")} /><br /><br />
                
                <PlaceButton num="13" occupe={estOccupee("13")} />
                <PlaceButton num="14" occupe={estOccupee("14")} />
                <PlaceButton num="15" occupe={estOccupee("15")} />
                <PlaceButton num="16" occupe={estOccupee("16")} />
            </div>
        </>
    );
}

export default PlaceC;