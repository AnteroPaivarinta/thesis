import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ConfirmModal = () => {
    return(
        <div className="modal">
            <FontAwesomeIcon color='green' className='icon' icon={faCircleCheck} />
            <div style={{display: 'flex', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color:'green'}}> Ilmoittautuminen vastaanotettu, kiitos! | Anmälan är mottagen, tack! </h1>
                <h4>Jos haluat päivittää tietojasi, laita spostia - kilpailunjohtaja@kk2024.fi - Om du vill uppdatera dina uppgifter använd denna epost.</h4>
                <h4>Voit sulkea selainikkunan | Du kan stänga webbläsaren </h4>
            </div>
        </div>     
    )
}

export default ConfirmModal;