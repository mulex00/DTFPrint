import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo_dark from '../images/cropped-mmstickerlogo-1_white.png'
import logo_light from '../images/cropped-mmstickerlogo-1.png'

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [logo, setLogo] = useState(logo_dark);

    //Sötét és világos kinézet
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('theme', 'dark')
        setLogo(logo_dark)
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute('theme', 'light')
        setLogo(logo_light)
    }
    const toggleTheme = e => {
        if (e.target.checked) setLightMode();
        else setDarkMode()
    }
    
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> 
                    <img style={{width: 80, height: 55}}src={logo} alt="logo"/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Főoldal
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-links' onClick={closeMobileMenu} href="https://www.mmsticker.hu/" target="_blank" rel="noopener noreferrer">Webshop</a>
                        </li>
                        <li className='nav-item'>
                        <a className='nav-links' onClick={closeMobileMenu} href="https://www.mmsticker.hu/cegunkrol/" target="_blank" rel="noopener noreferrer">Cégünkről</a>
                        </li>
                        <li className='nav-item'>
                         <div className="darkmode-button"> 
                        <input type='checkbox' onClick={closeMobileMenu && toggleTheme} className='nav-checkbox' ></input>
                        </div>  
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default Navbar