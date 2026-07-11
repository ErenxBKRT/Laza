function Confirmer ({ message = "Etes vous sure de vouloir le supprimer", onConfirmer, onAnnuler }){

    return<>
        <div className="carte">
            <p>{message}</p>
            <button type="button" onClick={onConfirmer}>Confirmer</button>
		    <button type="button" onClick={onAnnuler}>Annuler</button><br/>
        </div>
    </>
}

export default Confirmer;
