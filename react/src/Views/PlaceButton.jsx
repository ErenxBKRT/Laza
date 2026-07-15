
function PlaceButton({ num, occupe }) {
    return (
        <button 
            // On lui donne une classe différente s'il est occupé
            className={`mon-bouton-place ${occupe ? "occupe" : "libre"}`}
            disabled={occupe} // Empêche de cliquer si occupé (optionnel)
        >
            {num}
        </button>
    );
}

export default PlaceButton;
