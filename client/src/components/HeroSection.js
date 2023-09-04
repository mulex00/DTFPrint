import React from 'react'
import { Button } from './Button'
import '../App.css'
import './HeroSection.css'
import hero_video from '../images/lines_-_12918 (Original).mp4'
import { useRef } from 'react'
import Home from './pages/Home'

function HeroSection(props) {
  
  const scrollRef = props.scrollRef

  const scrollToForm = e => {
    e.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className='hero-container'>
      <video src={hero_video} autoPlay loop muted/>
        <h1>DTF Bérnyomtatás</h1>
        <p>Rendelj tőlünk egyedi, kiváló minőségi DTF nyomatokat kedvező áron és gyors szállítási idővel.</p>
        <div className='hero-btns'>
            <Button 
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            onClick={()=>scrollToForm(scrollRef)}
            >
            RENDELÉS LEADÁSA
          </Button>
        </div>
    </div>
  )
}

export default HeroSection;