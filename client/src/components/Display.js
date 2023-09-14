import React from 'react'
import './Display.css'

const Display = ({display}) => {
  return (
    <div className='display-container'>
        <h2>Display</h2>
        <div className="display-tshirt">
            <img 
            className='display-tshirt-img'
            src={require(`../images/tshirts/129_${display.tshirtColor}_${display.tshirtView}_lb-min.jpg`)} alt="tshirt-image" />
        <div className='display-edit-area'>
        {(() => {
  if (display.tshirtView == "A") {
    if (display.tshirtImgA){
    return        <img 
    style={{width: parseInt(display.tshirtImgSizeA)+"%", height: "auto", left: parseFloat(display.tshirtImgXPosA)+"%", top: parseFloat(display.tshirtImgYPosA)+"%", border: "none"}}
    className='display-custom-img' 
    src={display.tshirtImgA} alt="custom-image" /> 
    }
    else {
      return         <img 
      style={{width: "100%", height: "auto", left: "0%", top: "0%", border: "white solid 3px"}}
      className='display-custom-img'
      src="http://via.placeholder.com/400x300" alt="custom-image" />
    }
  }

  if (display.tshirtView == "B") {
    if (display.tshirtImgB){
    return        <img 
    style={{width: parseInt(display.tshirtImgSizeB)+"%", height: "auto", left: parseFloat(display.tshirtImgXPosB)+"%", top: parseFloat(display.tshirtImgYPosB)+"%", border: "none"}}
    className='display-custom-img' 
    src={display.tshirtImgB} alt="custom-image" /> 
    }
    else {
      return         <img 
      style={{width: "100%", height: "auto", left: "0%", top: "0%", border: "white solid 3px"}}
      className='display-custom-img'
      src="http://via.placeholder.com/400x300" alt="custom-image" />
    }
  }
})()}
        {/*{display.tshirtImgA ? 
        <img 
        style={{width: parseInt(display.tshirtImgSizeA)+"%", height: "auto", left: parseFloat(display.tshirtImgXPosA)+"%", top: parseFloat(display.tshirtImgYPosA)+"%", border: "none"}}
        className='display-custom-img' 
        src={URL.createObjectURL(display.tshirtImgA)} alt="custom-image" /> 
        :  
        <img 
            style={{width: "100%", height: "auto", left: "0%", top: "0%", border: "white solid 3px"}}
            className='display-custom-img'
            src="http://via.placeholder.com/400x300" alt="custom-image" /> }
        <div className="display-custom-text" style={{left: parseFloat(display.tshirtTextXPos)+"%", top: parseFloat(display.tshirtTextYPos)+"%"}}>
            <p style={{fontSize: parseFloat(display.tshirtFontSize*0.1)+"vw", textAlign: display.tshirtTextAlign, width:"100%", height: "auto", color: display.tshirtFontColor}}>{display.tshirtText}</p>
        </div>*/}
        </div>
        </div>  
    </div>
  )
}

export default Display