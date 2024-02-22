import React from 'react'
import { Button } from './Button'
import '../App.css'
import './HeroSection.css'
import hero_video from '../images/lines_-_12918 (Original).mp4'

function HeroSection(props, freeSamplePack, setFreeSamplePack) {
  
  const scrollRef = props.scrollRef

  const scrollToOrder = e => {
    props.setFreeSamplePack(false)
    e.current.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollToFreeSamplePack = e => {
    props.setFreeSamplePack(true)
    e.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className='hero-container'>
      <video src={hero_video} autoPlay loop muted/>
        <h1>DTF Bérnyomtatás</h1>
        <p>Csak egy hőprésre van szükséged! Mi kinyomtatjuk és eljuttatjuk részedre a kért mintát, neked már csak vasalni kell.
Rendelj tőlünk egyedi, kiváló minőségi DTF nyomatokat kedvező áron és gyors szállítási idővel.</p>
        <div className='hero-btns'>
            <Button 
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            onClick={()=>scrollToOrder(scrollRef)}
            >
            RENDELÉS LEADÁSA
          </Button>
          <Button 
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            onClick={()=>scrollToFreeSamplePack(scrollRef)}
            >
            INGYENES MINTACSOMAG
          </Button>
        </div>
        <div className='contact-btns'>
        <a
          href="tel: +36 (20) 967 45 46"
          aria-label="Telephone"
        >
          <i className="fa-solid fa-phone"></i>
        </a>
        <a
          href="mailto: dtf@mmsticker.hu"
          aria-label="Email"
        >
          <i className="fa-solid fa-envelope"></i>
        </a>
        </div>
    </div>
  )
}

export default HeroSection;