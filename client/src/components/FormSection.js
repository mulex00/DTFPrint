import React, {useRef, useState} from "react"
import './FormSection.css'

//Űrlap
const FormSection = () => {
    const [dtfImage, setDtfImage] = useState('')
    const [dtfImageFile, setDtfImageFile] = useState('')
    const [dtfLength, setDtfLength] = useState('1');
    const [email, setEmail] = useState('');
    const [dtfPrice, setDtfPrice] = useState(6000);

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState("Rendelés leadása")

    const inputRef = useRef(null);
    const form = useRef();

    const T_100_W_Price = 3000;
    const T_50_W_Price = 2500;
    const A3_100_W_Price = 2000;
    const A3_50_W_Price = 1500;

    //Elküldés
    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if(dtfImage && dtfLength && email && dtfImageFile){
        let formData = new FormData();
        formData.append('Image', dtfImage);
        formData.append('email', email);
        formData.append('length', dtfLength);
        formData.append('price', Price);

        formData.append('country', country);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('apartment', apartment);
        formData.append('message', message);

      //Email küldése      
      setButtonText("Küldés folyamatban...")
      fetch('https://dtf-print.onrender.com/send_email'/*'http://localhost:5000/send_email'*/, {
        method: 'POST', body: formData, 
      }).then(()=>alert("Rendelés sikeresen elküldve!") & setButtonText("Rendelés leadása"))
      .catch(()=>alert("Hiba történt!") & setButtonText("Rendelés leadása"));
      return;
    };
    return alert("Tölts ki minden mezőt a rendelés leadásához!");
};
    //Feltöltött minta képe
    const handleImageChange = (event) => {
        console.log(event.target.files[0]);
        setDtfImageFile(event.target.files);
        console.log(dtfImageFile);
        setDtfImage(event.target.files[0]);
    };
    //Árváltozás
    /*const changePrice = (e) => {
        setDtfType(e.target.value)
        console.log(dtfType);
        if(e.target.value == "Tekercs 100% fehér alányomás | 3000 Ft/m"){
            setDtfPrice(T_100_W_Price);
        }
        if(e.target.value == "Tekercs 50% fehér alányomás | 2500 Ft/m"){
            setDtfPrice(T_50_W_Price);
        }
        if(e.target.value == "A3 100% fehér alányomás | 2000 Ft/m"){
            setDtfPrice(A3_100_W_Price);
        }
        if(e.target.value == "A3 50% fehér alányomás | 1500 Ft/m"){
            setDtfPrice(A3_50_W_Price);
        }      
    }*/
    let Price = dtfPrice*dtfLength

    return(
        <div className="form-container">
        <div className="form-elements">   
        <h1>Rendelés leadása!</h1>
        <form action="#" ref={form} onSubmit={handleSubmit}>
            <label>Minta feltöltése:</label>
            <input className="form-fileupload"
            type="file" 
            accept="image/*"
            ref={inputRef} 
            onChange={handleImageChange}
            required
            name="dtfImage"
            ></input>
            {dtfImage ? <img src={URL.createObjectURL(dtfImage)} style={{maxWidth: 100}} alt="dtfImage" /> : <label>Nincs minta feltöltve</label> }
            <h2 className="price_h2">6000 Ft / méter</h2>
            {/*<select
                className ="select_options"
                value={dtfType}
                onChange={changePrice}
                name="dtfType"
            >
                <option value="Tekercs 100% fehér alányomás | 3000 Ft/m" className="select_option">
                    Tekercs 100% fehér alányomás | 3000 Ft/m
                    </option>
                <option value="Tekercs 50% fehér alányomás | 2500 Ft/m" className="select_option">
                    Tekercs 50% fehér alányomás | 2500 Ft/m
                    </option>
                <option value="A3 100% fehér alányomás | 2000 Ft/m" className="select_option">
                    A3 100% fehér alányomás | 2000 Ft/m
                    </option>
                <option value="A3 50% fehér alányomás | 1500 Ft/m" className="select_option">
                    A3 50% fehér alányomás | 1500 Ft/m
                    </option>
    </select>*/}
            <label>Tekercs hossza (m)</label>
            <input type="number" 
            name="dtfLength"
            required 
            value={dtfLength}
            onChange={(e)=>setDtfLength(e.target.value)} 
            /> 
            <label>Email cím megadása</label>
            <input 
            name="email"
            type="email" 
            placeholder="Email cím"
            required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            />
            <div className="form-address-container">
            <div className="form-address-items">    
            <label>Ország</label>
            <input 
            name="country"
            type="text" 
            placeholder="Ország"
            autoComplete="country"
            required 
            value={country}
            onChange={(e)=>setCountry(e.target.value)} 
            />
            <label>Város</label>
            <input 
            name="city"
            type="text" 
            placeholder="Város"
            autoComplete="address-level2"
            required 
            value={city}
            onChange={(e)=>setCity(e.target.value)} 
            />
            </div>
            <div className="form-address-items">
            <label>Cím</label>
            <input 
            name="address"
            type="text" 
            placeholder="Cím"
            autoComplete="address-line1"
            required 
            value={address}
            onChange={(e)=>setAddress(e.target.value)} 
            />
            <label>Házszám</label>
            <input 
            name="apartment"
            type="text" 
            placeholder="Házszám"
            autoComplete="address-line2"
            required 
            value={apartment}
            onChange={(e)=>setApartment(e.target.value)} 
            />
            </div>
            </div>
            <label>Megjegyzés a megrendeléshez</label>
            <textarea 
            className ="form-message"
            name="message" 
            placeholder="Megjegyzés a megrendeléshez"
            value={message}
            onChange={(e)=>setMessage(e.target.value)} 
            />
            <h2 className="final_price">Fizetendő összeg: {Price} Ft</h2>
            <div className='form-btns'>
            <button type="submit" className="form-btns-submit">{buttonText}</button>
            <button type="reset" className="form-btns-reset">Rendelés újraatöltése</button>
            </div>
        </form>
        </div> 
        </div>
    );
}

export default FormSection;