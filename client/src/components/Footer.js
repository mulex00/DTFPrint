import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return(
        <div className='footer-container'>
            <section className="footer-contact">
            <h1>Kérdésed van? Állunk rendelkezésedre! Telefon: <a href="tel: +36 (20) 967 45 46"> +36 (20) 967 45 46 </a></h1>
                <h1>Email: <a href="mailto: info@mmsticker.hu">info@mmsticker.hu</a></h1>
            </section>
            <div className='footer-links'>
            <div className="footer-items">
                <h1>Rólunk</h1>
                <Link to='/'>Kezdőlap</Link>
                <a href='https://www.mmsticker.hu/gyakran-ismetelt-kerdesek/' target='blanc'>GY.I.K</a>
                <a href='https://www.mmsticker.hu/cegunkrol/' target= 'blanc'>Cégünkről</a>
                <a href='https://www.mmsticker.hu/kapcsolat/' target= 'blanc'>Kapcsolatfelvétel</a>
            </div>
            <div className="footer-items">
                <h1>Információk</h1>
                <a href='https://www.mmsticker.hu/szallitasi-informaciok/' target= 'blanc'>Szállítási információk</a>
                <a href='https://www.mmsticker.hu/altalanos-szerzodesi-feltetelek/' target= 'blanc'>Általános szerződési feltételek</a>
                <a href='https://www.mmsticker.hu/adatkezelesi-tajekoztato/' target= 'blanc'>Adatkezelési tájékoztató</a>
                <a href='https://www.mmsticker.hu/impresszum/' target= 'blanc'>Impresszum</a>
            </div>
            </div>
            <div className="footer-socialmedia">
                <a href='https://www.facebook.com/profile.php?id=100057566885552' target='_blank' aria-label='Facebook'>
                    <i className="fab fa-facebook-f"></i>
                </a>
                {/*<Link to='' target='_blank' aria-label='Instagram'>
                    <i className="fab fa-instagram"></i>
                </Link>
                <Link to='' target='_blank' aria-label='Twitter'>
                    <i className="fab fa-twitter"></i>
    </Link>*/}
            </div>
        </div>
    );
}
export default Footer;