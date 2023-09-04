import React, { Component } from 'react'
import '../App.css'
import './DTF.css'
import mug from '../images/wildflower-mug.jpg'

function DTF() {
    return (
      <div className='dtf-container'>
        <div className='dtf-elements'>
        <div className='dtf-text'>
          <h1>Ismerd meg a DTF (Direct To Film) nyomtatás világát</h1>
          <p>A DTF (Direct To Film) nyomtatás egy olyan eljárás, amely lehetővé 
            teszi, hogy szinte bármilyen képet, grafikát vagy design-t közvetlenül 
            nyomtassunk különféle anyagokra, mint például pólók, sapkák, táskák és 
            még sok más. Ez a módszer rendkívül sokoldalú és rugalmas, és lehetővé 
            teszi, hogy személyre szabott ajándékokat készíts, egyedi ruházati 
            darabokat tervezz vagy akár saját márkád alatt állíts elő és értékesíts 
            különleges termékeket. A DTF nyomatok mellett szól: magas felbontású grafikák 
            nyomtatása, élénk színek, tartós, különböző anyagokon használható és gyors gyártás.</p>
        </div>
        <div className='dtf-image'>
        <img style={{height:400}}src={mug} alt="mug"/>  
        </div>
        </div>    
      </div>
    )
  }
  
  export default DTF;