import React, { useState } from 'react'
import './Settings.css'
require('dotenv').config();


const colors = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "11", "12", "13", "14", "15", "16", "19", "23", "27", "28", "29", "30", "38", "39", "43", "44", "49", "51", "60", "62", "64", "67", "69", "87", "92", "93", "94", "95", "96", "a1", "a2"]
const Settings = ({settings, tshirt_view, tshirt_color, tshirt_text, tshirt_fontsize, tshirt_text_align, tshirt_text_XPos, tshirt_text_YPos, tshirt_fontcolor, uploadImageA, uploadImageSizeA, uploadImageXPosA, uploadImageYPosA, AIImagePromptA, GenerateAIImageA, uploadImageB, uploadImageSizeB, uploadImageXPosB, uploadImageYPosB, AIImagePromptB, GenerateAIImageB }) => {

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
    {/*<h3>Szöveg</h3>
    <input onChange={tshirt_text} type="text" className='tshirt-text' placeholder='Írj ide valamit' />
    <h3>Szöveg mérete</h3>
    <input onChange={tshirt_fontsize} type='range' step='0.01' min="1" max="100" className='font-size' />
    <h3>Szöveg pozíciója</h3>
    <select onChange={tshirt_text_align} className='text-align'>
        <option value='left'>Balra</option>
        <option value='center'>Középre</option>
        <option value='right'>Jobbra</option>
    </select>
    <h3>x</h3>
    <input onChange={tshirt_text_XPos} type='range' step='0.01' min="0" max="100" className='text-x-pos' />  
    <h3>y</h3>
    <input onChange={tshirt_text_YPos} type='range' step='0.01' min="0" max="100" className='text-y-pos' />  
    <h3>Szöveg színe</h3>
    <select onChange={tshirt_fontcolor} className='text-color'>
        <option value='black'>Fekete</option>
        <option value='white'>Fehér</option>
        <option value='red'>Piros</option>
        <option value='blue'>Kék</option>
    </select>*/}
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
    return <button onClick={GenerateAIImageA} className='ai-image-generator-button'>Kép generálása</button>
  }
})()}

{(() => {
  if (settings.tshirtView == "B") {    
    return <input value={settings.tshirtAIPromptB} onChange={AIImagePromptB} type="text" className='ai-image-generator-textinput' placeholder='Generálj egy képet' />
  }
})()}
    {(() => {
  if (settings.tshirtView == "B") {
    return <button onClick={GenerateAIImageB} className='ai-image-generator-button'>Kép generálása</button>
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
    <h3>Minta pozíciója</h3>
    <h3>x</h3>
    {(() => {
  if (settings.tshirtView == "A") {
    return <input onChange={uploadImageXPosA} value={settings.tshirtImgXPosA} type='range' step='0.01' min="-100" max="100" className='image-x-pos' /> ;
  }
})()} 
    {(() => {
  if (settings.tshirtView == "B") {
    return <input onChange={uploadImageXPosB} value={settings.tshirtImgXPosB} type='range' step='0.01' min="-100" max="100" className='image-x-pos' /> ;
  }
})()} 
    <h3>y</h3>
    {(() => {
  if (settings.tshirtView == "A") {
    return <input onChange={uploadImageYPosA} value={settings.tshirtImgYPosA} type='range' step='0.01' min="-100" max="100" className='image-y-pos' />;
  }
})()}
    {(() => {
  if (settings.tshirtView == "B") {
    return <input onChange={uploadImageYPosB} value={settings.tshirtImgYPosB} type='range' step='0.01' min="-100" max="100" className='image-y-pos' />;
  }
})()}      
    <div className='setting-buttons'>
    <button className='save-design'>Mentés</button>
    </div>
    </div>
    </div>
  )
}

export default Settings