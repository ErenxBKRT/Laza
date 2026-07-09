import './place.css'
import PlaceButton from './PlaceButton';

function PlaceC() {

    return <>
        <div className='placeC'>
        <button className="cc">c</button>
        <button className="cc">o</button>

        <PlaceButton num="1"/>
        <PlaceButton num="2"/><br/><br/>
        <PlaceButton num="3"/>
        <PlaceButton num="4"/>
        <PlaceButton num="5"/>
        <PlaceButton num="6"/><br/><br/>
        <PlaceButton num="7"/>
        <PlaceButton num="8"/>

        <button className="cc">|  |</button>

        <PlaceButton num="9"/><br/><br/>
        <PlaceButton num="10"/>
        <PlaceButton num="11"/>

        <button className="cc">|  |</button>

        <PlaceButton num="12"/><br/><br/>
        <PlaceButton num="13"/>
        <PlaceButton num="14"/>
        <PlaceButton num="15"/>
        <PlaceButton num="16"/>
        </div>


    </>

}

export default PlaceC;