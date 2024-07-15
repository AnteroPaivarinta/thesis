import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
const SelectBoxes = (props: any) => {
  const selectedValues = props.selectedValues.map((value:any) => value.label)
  const options = [
    { value: '1', label: 'Tuomari | Domare'},
    { value: '2', label: 'Järjestyksen valvoja (kortillinen) | Ordningsövervakare (med kort)'},
    {value: '3', label: 'Järjestyksen tai liikennevalvoja (ilmankorttia) | Ordnings- eller trafikövervakare (utan kort)'},
    {value: '4', label: 'Avustaja palkintojen jaossa | Assistens vid prisutdelningar'},
    {value: '5', label: 'Tulospalvelu (atk) | Resultatservice (adb) '},
    {value: '6', label: 'Kisakansliatoimitsija | Funktionär i tävlingskansliet'},
    {value: '7', label: 'Vaatekorin kantaja (väh. 10 v) | Klädkorgbärare (min. 10 år)'},
    {value: '8', label: 'Kioskinmyyjä | Kioskförsäljare'},
    {value: '9', label: 'VIP-teltan toimitsija | Funktionär i VIP-tältet'},
    {value: '10', label: 'Lipunmyyjä | Biljettförsäljare '},
    {value: '11', label: 'Rakentamistiimin jäsen (ennen kisoja) | Medlem av byggteamet (före tävlingarna)'},
    {value: '12', label: 'Muu (kerro kommenteissa) | Annat önskemål (ange i kommentarerna)'},
  ]
  return (
    <div className='square'>
      <div className='taskDropDown' data-testid='selectionbox'>
      <form data-testid="form">
        <label htmlFor="selectionbox">selectionbox</label>
        <Select inputId="selectionbox" name='selectionbox' options={options.filter((value)=> !selectedValues.includes(value.label))} onChange={(e) =>props.selectHandleChange(e)}   />
      </form>
      </div>
      <div className='taskList'>
        {selectedValues.map((value : string) => 
          <div className='taskSelectedListItem'>
            <div onClick={() => props.remove(value)} style={{alignSelf:'flex-start'}}><FontAwesomeIcon icon={faCircleXmark} color='red '  size='2x'/> </div>
             <div>{value} </div>
          </div> ) 
        } 
      </div>
    </div>
  );
}

export default SelectBoxes;
