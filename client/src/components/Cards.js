import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import TshirtImg1 from '../images/129_04_C_lb-min.jpg';
import TshirtImg2 from '../images/129_05_D_lb-min.jpg';
import TshirtImg3 from '../images/129_07_C_lb-min.jpg';

function Cards() {
  return (
    <div className='cards'>
      <h1>Egy kis ízelítő</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={TshirtImg1}
              text='Élénk színek'
              label='T-Shirt'
            />
            <CardItem
              src={TshirtImg2}
              text='Különböző anyagokon használható'
              label='T-Shirt'
            />
            <CardItem
              src={TshirtImg3}
              text='Gyors gyártási idő'
              label='T-Shirt'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
