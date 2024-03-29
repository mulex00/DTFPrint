import React, { useRef, useState } from "react";
import "./FormSection.css";
import axios from "axios";

//Űrlap
let dtfLengthArray = [];
let priceArray = [];

const FormSection = ({freeSamplePack, setFreeSamplePack}) => {
  const [dtfImage, setDtfImage] = useState("");
  const [dtfImageFile, setDtfImageFile] = useState([]);
  let dtfImageArray = [];
  const [dtfLength, setDtfLength] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [email, setEmail] = useState("");
  const [telNum, setTelNum] = useState("");
  const [dtfPrice, setDtfPrice] = useState(6000);
  const [Price, setPrice] = useState(6000);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [shipping, setShipping] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Rendelés leadása");
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);
  const form = useRef();

  /*
  const T_100_W_Price = 3000;
  const T_50_W_Price = 2500;
  const A3_100_W_Price = 2000;
  const A3_50_W_Price = 1500;*/

  // Progress
  const handleProgress = (event) => {
    if (event.lengthComputable) {
      const percentage = (event.loaded / event.total) * 100;
      setProgress(percentage);
    }
  };

  // Submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    //ORDER
    if (freeSamplePack == false) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate
      .getDate()
      .toString()
      .padStart(2, "0");
    const hours = currentDate
      .getHours()
      .toString()
      .padStart(2, "0");
    const minutes = currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const seconds = currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0");

    const formattedTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

    if (dtfImage && dtfLength && name && email && telNum && country && city && address && zip && dtfImageFile) {
      for (const image of dtfImageFile) {
        formData.append("Image", image);
      }
      formData.append("freeSamplePack", freeSamplePack)
      formData.append("name", name);
      formData.append("date", formattedTime);
      formData.append("company", company);
      formData.append("companyName", companyName);
      formData.append("taxNumber", taxNumber);
      formData.append("email", email);
      formData.append("telNum", telNum);
      formData.append("length", dtfLength);
      //formData.append("price", Price);

      formData.append("country", country);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("zip", zip);
      formData.append("shipping", shipping);
      formData.append("message", message);

      setButtonText("Küldés folyamatban...");

      try {
        const response = await axios.post(
          "https://dtf-print.onrender.com/send_email" /*'https://mmstore.hu/alexserver'*/ /*'http://localhost:5000/send_email'*/,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(progress);
            }, // Progress callback
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle success
        alert("Rendelés sikeresen elküldve!");
        setButtonText("Rendelés leadása");
        setProgress(0);
      } catch (error) {
        // Handle error
        alert("Hiba történt!");
        setButtonText("Rendelés leadása");
        setProgress(0);
      }
    } else {
      alert("Tölts ki minden mezőt a rendelés leadásához!");
    }
  }

  //FREE SAMPLE PACK
  if (freeSamplePack == true) {
    if (name && email && telNum && country && city && address && zip) {;

      formData.append("freeSamplePack", freeSamplePack)
      formData.append("name", name);
      formData.append("company", company);
      formData.append("companyName", companyName);
      formData.append("taxNumber", taxNumber);
      formData.append("email", email);
      formData.append("telNum", telNum);
      //formData.append("price", Price);

      formData.append("country", country);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("zip", zip);
      formData.append("message", message);

      setButtonText("Küldés folyamatban...");

      try {
        const response = await axios.post(
          "https://dtf-print.onrender.com/send_email" /*'https://mmstore.hu/alexserver'*/ /*'http://localhost:5000/send_email'*/,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(progress);
            }, // Progress callback
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle success
        alert("Rendelés sikeresen elküldve!");
        setButtonText("Rendelés leadása");
        setProgress(0);
      } catch (error) {
        // Handle error
        alert("Hiba történt!");
        setButtonText("Rendelés leadása");
        setProgress(0);
      }
    } else {
      alert("Tölts ki minden mezőt a rendelés leadásához!");
    }
  }
  };

  //Feltöltött minta képe
  const handleImageChange = (event) => {
    /*console.log(event.target.files);
        console.log(event.target.files.length);*/
    var fileLabel = document.getElementById("file-name");
    if (event.target.files.length > 0 && event.target.files.length <= 10) {
      fileLabel.innerText = "";
    } else {
      fileLabel.innerText = "Nincs fájl kiválasztva!";
    }
    if (event.target.files.length <= 10) {
      const selectedFiles = Array.from(event.target.files);
      const updatedImages = [...selectedFiles];
      setDtfImageFile(selectedFiles);
      dtfImageArray = Array.from(event.target.files);
      setDtfImage(event.target.files[0]);
      dtfLengthArray = [];
      priceArray = [];
      setPrice(0);
      setDtfLength([]);
      /*console.log(dtfImageArray[0]);
        console.log(dtfImageArray.length);
        console.log(dtfImage);*/
    } else {
      alert("Maximum 10 fájl tölthető fel!");
      event.target.value = null;
      setDtfImageFile("");
      setDtfImage("");
      dtfImageArray = [];
      dtfLengthArray = [];
      priceArray = [];
      return;
    }
  };
  const CalculateLength = (event, id) => {
    let currentPrice = 0;
    dtfLengthArray[id] = event.target.value;
    //console.log(`${id}. elem`);
    setDtfLength(dtfLengthArray);
    /*console.log(`hossztömb: ${dtfLengthArray}`);
      console.log(`hossztömb2: ${dtfLength}`)*/
    priceArray[id] = 0;
    for (let i = 0; i <= dtfLengthArray.length - 1; i++) {
      priceArray[i] = dtfPrice * dtfLengthArray[i];
      currentPrice = currentPrice + priceArray[i];
      /* console.log(`${id}.kép ára: ${priceArray[i]}`);
        console.log(`${id}.current price: ${currentPrice}`);*/
    }
    /*console.log(`Ártömb: ${priceArray}`);
      console.log(`Végső hossztömb: ${dtfLength}`);
      console.log(`Végső current price: ${currentPrice}`);*/
    setPrice(currentPrice);
  };

  return (
    <div className="form-container">
      <div className="form-elements">
        <h1>Rendelés leadása!</h1>
        <form action="#" ref={form} onSubmit={handleSubmit}>
        <div className="form-ordertype-container">
        <div className="form-ordertype-option">
              <label>
                <input
                  name="freeSamplePack"
                  type="radio"
                  checked={freeSamplePack}
                  required
                  onChange={(e) => setFreeSamplePack(true)}
                />
                Ingyenes mintacsomagot kérek
              </label>
            </div>
          <div className="form-ordertype-option">
              <label>
                <input
                  name="freeSamplePack"
                  type="radio"
                  checked={!freeSamplePack}
                  required
                  onChange={(e) => setFreeSamplePack(false)}
                />
                Egyedi DTF nyomatot rendelek
              </label>
            </div>
            </div>
          {freeSamplePack ? (<div>
            <label className="form-description">
              Az ingyenes mintacsomagunk előre összeállított mintákból áll, csak a felvasalható fóliát tartalmazza, melyek kizárólag a tesztelés célját szolgálják.
            </label>
          </div>):(
          <div>
            <label className="form-description">
              Kérem a mintát legalább 300 dpi felbontásban átlátszó háttérrel
              .png formátumban töltse fel! A legkissebb rendelhető mennyiség 1m.
              Nagyobb mennyiség vagy rendszeres rendelések esetén egyedi
              viszonteladói kedvezmény! Ha nagyobb méretű, esetleg más formátumú
              anyagot szeretne feltölteni, esetleg a minta feltöltése vagy
              elküldése sikertelen, akkor kérem keressen meg minket
              elérhetőségeink egyikén!
            </label>
            <label>Minta feltöltése (Maximum 10 fájl):</label>
            <label className="form-fileupload-button" for="file-upload">
              Fájlok kiválasztása
            </label>
            <input
              className="form-fileupload"
              type="file"
              id="file-upload"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              multiple
              required
              name="dtfImage"
            ></input>
            <div className="form-fileupload-text" id="file-name">
              Nincs fájl kiválasztva!
            </div>
            <h2 className="final_price_h2">6000 Ft / méter</h2>
            <p className="final_price_p">+Áfa +szállítási költség</p>
            {
              <div className="dtf-image">
                {(() => {
                  let images = [];
                  if (dtfImageFile) {
                    for (let i = 0; i <= dtfImageFile.length - 1; i++) {
                      images.push(
                        <section>
                          <img
                            src={URL.createObjectURL(dtfImageFile[i])}
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                            alt="dtfImage"
                            loading="lazy"
                          />
                          <label>Tekercs hossza (m)</label>
                          <input
                            type="number"
                            name="dtfLength"
                            onWheel={(e) => e.target.blur()}
                            min="1"
                            onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                            oninput="validity.valid||(value='');"
                            step="1"
                            required
                            id={i}
                            onChange={(e) => CalculateLength(e, e.target.id)}
                          />
                        </section>
                      );
                    }
                  }
                  return images;
                })()}
              </div>
            }
          </div>)}                 
          <label>Megrendelő neve</label>
          <input
            name="name"
            type="name"
            placeholder="Megrendelő neve"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-company-container">
          <div className="form-company-option">
            <label>
              <input
                type="checkbox"
                value={company}
                onChange={(e) => setCompany(!company)}
              />
              Céges vásárlás ?
            </label>
            </div>
          </div>
          {company ? (
            <div>
              <label>Cég neve</label>
              <input
                name="companyName"
                type="companyName"
                placeholder="Cég neve"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <label>Adószám</label>
              <input
                name="taxNumber"
                type="taxNumber"
                placeholder="Adószám"
                required
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
              />
            </div>
          ) : (
            <div></div>
          )}
          <label>Email cím megadása</label>
          <input
            name="email"
            type="email"
            placeholder="Email cím"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Telefonszám</label>
          <input
            name="tel"
            type="tel"
            placeholder="Telefonszám"
            required
            value={telNum}
            onChange={(e) => setTelNum(e.target.value)}
          />
          <label>Szállítási adatok</label>
          <div className="form-address-container">
            <div className="form-address-items">
              <input
                name="country"
                type="text"
                placeholder="Ország"
                autoComplete="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                name="zip"
                type="zip"
                placeholder="Irányítószám"
                autoComplete="zip"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="form-address-items">
              <input
                name="city"
                type="text"
                placeholder="Város"
                autoComplete="address-level2"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                name="address"
                type="text"
                placeholder="Utca, házszám"
                autoComplete="address-line1"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          {freeSamplePack ? (<div></div>) : 
          (<div>
          <label>Átvétel módja</label>
          <div className="form-shipping-container">
            <div className="form-shipping-option">
              <label>
                <input
                  name="radio"
                  type="radio"
                  required
                  value="Futár"
                  onChange={(e) => setShipping(e.target.value)}
                />
                Futár
              </label>
            </div>
            <div className="form-shipping-option">
              <label>
                <input
                  name="radio"
                  type="radio"
                  required
                  value="Személyes átvétel"
                  onChange={(e) => setShipping(e.target.value)}
                />
                Személyes átvétel
              </label>
            </div>
          </div>
          </div>)}
          <label>Megjegyzés a megrendeléshez</label>
          <textarea
            className="form-message"
            name="message"
            placeholder="Megjegyzés a megrendeléshez"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/*<h2 className="final_price">Fizetendő összeg: {Price} Ft</h2>
          <p className="final_price">+Áfa +szállítási költség</p>*/}
          <div className="form-btns">
            <button type="submit" className="form-btns-submit">
              {buttonText}
            </button>
          </div>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                borderRadius: "10px",
                backgroundColor: "rgb(0, 200, 0)",
                height: "20px",
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
