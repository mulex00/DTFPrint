import React, { Component } from 'react'
import '../App.css'
import './DTF.css'
import dtfTransfer from '../images/dtf_transfer.png'

function DTF() {
    return (
      <div className='dtf-container'>
        <div className='dtf-elements'>
        <div className='dtf-text'>
          <h1>Ismerd meg a DTF (Direct To Film) nyomtatás világát</h1>
          <p>A DTF (Direct To Film) nyomtatás egy olyan eljárás, amely lehetővé 
            teszi, hogy szinte bármilyen képet, grafikát vagy design-t közvetlenül 
            nyomtassunk különféle anyagokra, mint például pólók, sapkák, táskák és 
            még sok más. Az eljárás lényege az, hogy a mintát vagy a grafikát 
            közvetlenül egy filmrétegre nyomtatják, majd ezt a filmet használják sablonként 
            a textilfelületek mintázásához. 
            Ez a módszer rendkívül sokoldalú és rugalmas, és lehetővé 
            teszi, hogy személyre szabott ajándékokat készíts, egyedi ruházati 
            darabokat tervezz vagy akár saját márkád alatt állíts elő és értékesíts 
            különleges termékeket. A DTF nyomatok mellett szól: magas felbontású grafikák 
            nyomtatása, élénk színek, tartós, különböző anyagokon használható és gyors gyártás.</p>
        </div>
        <div className='dtf-image'>
        <img src={dtfTransfer} alt="dtfTransfer"/>  
        </div>
        </div>    
      </div>
    )
  }
  
  export default DTF;