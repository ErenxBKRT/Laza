import '../style/place.css'
import PlaceButton from './PlaceButton';

function PlaceP () {


    return <>
        <div className="PlaceP">
            <button className="cc">c</button>
            <button className="cc">o</button>

            <PlaceButton num="1"/><br/><br/>
            <PlaceButton num="2"/>
            <PlaceButton num="3"/>
            <PlaceButton num="4"/><br/><br/>
            <PlaceButton num="5"/>
            <button className="cc">|  |</button>
            <PlaceButton num="6"/><br/><br/>
            <PlaceButton num="7"/>
            <PlaceButton num="8"/>
            <PlaceButton num="9"/>
        </div>
    </>

}

export default PlaceP;