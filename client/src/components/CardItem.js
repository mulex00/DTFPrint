import React from 'react';

function CardItem(props) {
  //Kártya komponens
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='DTFPrint'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
            <p className='cards__item__description'>{props.description}</p>
  </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;