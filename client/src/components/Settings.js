import React from 'react'
import './Settings.css'
require('dotenv').config();


const colors = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "11", "12", "13", "14", "15", "16", "19", "23", "27", "28", "29", "30", "38", "39", "43", "44", "49", "51", "60", "62", "64", "67", "69", "87", "92", "93", "94", "95", "96", "a1", "a2"]
const Settings = ({settings, tshirt_view, tshirt_color, tshirt_text, tshirt_fontsize, tshirt_text_align, tshirt_text_XPos, tshirt_text_YPos, tshirt_fontcolor, uploadImageA, uploadImageSizeA, uploadImageXPosA, uploadImageYPosA, AIImagePromptA, GenerateAIImageA, uploadImageB, uploadImageSizeB, uploadImageXPosB, uploadImageYPosB, AIImagePromptB, GenerateAIImageB }) => {
//TShirt Designer beállításai
  return (
    <div className="settings">
      <h2>Settings</h2>
    <div className="settings-container">
    <h3>Nézet: {settings.tshirtView} </h3>
    <select onChange={tshirt_view} className='text-align'>
        <option value='A'>Első</option>
        <option value='B'>Hátsó</option>
    </select>
    <h3>Póló színe</h3>
    <div className='tshirt-color'>
      {(() => {
        let images = [];
        for (let i = 0; i<= colors.length-1; i++){
          images.push(<img onClick={tshirt_color} src={require(`../images/tshirts/129_${colors[i]}_${settings.tshirtView}_lb-min.jpg`)} alt={colors[i]} id={colors[i]} />);
        }
        return images;
      })()}
    </div>  
    <h3>Minta feltöltése</h3>
    <div className='file-upload'>
    {(() => {
  if (settings.tshirtView == "A") {
    return <input onChange={uploadImageA} type="file" accept="image/*" className='file-upload-button'/>;
  }
})()}
    {(() => {
  if (settings.tshirtView == "B") {
    return <input onChange={uploadImageB} type="file" accept="image/*" className='file-upload-button'/>;
  }
})()}
    </div>
    <h3>AI képgenerálás</h3>
    {(() => {
  if (settings.tshirtView == "A") {    
    return <input value={settings.tshirtAIPromptA} onChange={AIImagePromptA} type="text" className='ai-image-generator-textinput' placeholder='Generálj egy képet' />
  }
})()}
    {(() => {
  if (settings.tshirtView == "A") {
    return <button onClick={GenerateAIImageA} className='ai-image-generator-button'>{settings.buttonText}</button>
  }
})()}

{(() => {
  if (settings.tshirtView == "B") {    
    return <input value={settings.tshirtAIPromptB} onChange={AIImagePromptB} type="text" className='ai-image-generator-textinput' placeholder='Generálj egy képet' />
  }
})()}
    {(() => {
  if (settings.tshirtView == "B") {
    return <button onClick={GenerateAIImageB} className='ai-image-generator-button'>{settings.buttonText}</button>
  }
})()}
    <h3>Minta mérete</h3>
    {(() => {
  if (settings.tshirtView == "A") {
    return <input onChange={uploadImageSizeA} value={settings.tshirtImgSizeA} type='range' step='0.01' min="1" max="100" className='image-size' />
  }
})()}
    {(() => {
  if (settings.tshirtView == "B") {
    return <input onChange={uploadImageSizeB} value={settings.tshirtImgSizeB} type='range' step='0.01' min="1" max="100" className='image-size' />
  }
})()}
    </div>
    </div>
  )
}

export default Settings