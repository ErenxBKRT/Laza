import React from 'react';
import '../style/place.css';

function PlaceButton({ num, occupe }) {
    return (
        <button 
            className={`mon-bouton-place ${occupe ? "occupe" : "libre"}`}
            disabled={occupe}>
            {num}
        </button>
    );
}

export default PlaceButton;

