import React, { Component } from 'react'
import '../App.css'
import './DTF.css'

function DTF() {
    return (
      <div className='dtf-container'>
        <div className='dtf-elements'>
        <div className='dtf-text'>
        <h1>Ismerd meg a DTF (Direct To Film) nyomtatás világát</h1>
          <p>A DTF (Direct To Film) nyomtatás egy olyan eljárás, amely lehetővé teszi, hogy szinte bármilyen képet, grafikát vagy design-t nyomtassunk különféle anyagokra, mint például pólókra, sapkákra, táskákra, fémre, fára és még sok más anyagra. 
Az eljárás lényege az, hogy a mintát vagy a grafikát közvetlenül egy hordozó filmrétegre nyomtatjuk, majd ezt a filmet egy hőpréssel lehet felvinni a mintázandó felületre.
Ez a módszer rendkívül sokoldalú és rugalmas, Kiváló minőségű és rendkívül tartós nyomat készíthető, és lehetővé teszi, hogy személyre szabott ajándékokat készíts, egyedi ruházati darabokat tervezz vagy akár saját márkád alatt állíts elő és értékesíts különleges termékeket.</p>
<p>A DTF nyomatok mellett szól: magas felbontású grafikák nyomtatása, élénk színek, tartós, különböző anyagokon használható és gyors gyártás.
</p>
        </div>
        <div className='video_wrap'>
        <div className='video_container'>
        <iframe  
      src="https://www.youtube.com/embed/ZEH8mOEOsho?si=iZqv1mrpy9vXUkOO" 
      title="DTF Nyomtatás - Nálunk így készül"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
        {/*<img src={dtfTransfer} alt="dtfTransfer"/>*/}  
        </div>
        </div>
        </div>    
      </div>
    )
  }
  
  export default DTF;