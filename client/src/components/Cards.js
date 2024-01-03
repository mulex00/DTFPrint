import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import Colorful from "../images/colorful.jpg";
import Materials from "../images/materials.jpg";
import WashingMachine from "../images/washing.jpg";
import Green from "../images/green.jpg";
import DtfPrinter from "../images/audley_machine.png";

function Cards() {
  //Információs kártyák 
  return (
    <div className="cards">
      <h1>A Direct To Film (DTF) nyomtatás előnyei</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={Colorful}
              text="Élénk színek, részletgazdag minták"
              description="A DTF nyomtatás lehetővé teszi a gazdag és élénk színek használatát a textilnyomatokon. 
              Az inkjet technológia és a speciális tinták lehetővé teszik a finom részletek és átmenetek megjelenítését, ami kiváló minőségű nyomatokat eredményez."
            />
            <CardItem
              src={Materials}
              text="Különböző textil anyagokon használható"
              description="Az eljárás rugalmas és sokféle alkalmazást kínál, például ruházat, pólók, sapkák, poszterek, matricák és egyéb textiltermékek készítéséhez."
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={WashingMachine}
              text="Kiváló tartósság"
              description="A DTF nyomtatás tartós nyomatokat eredményez, amelyek ellenállnak a mosásnak és a kopásnak."
            />
            <CardItem
              src={Green}
              text="Környezetbarátabb lehetőség"
              description=" A DTF nyomtatás kevesebb víz- és vegyszerhasználatot igényel a hagyományos textilnyomtatási módszerekhez képest, ami környezetbarátabb megoldást jelenthet."
            />
            <CardItem
              src={DtfPrinter}
              text="Gyors gyártási idő"
              description="A pólókat nem kell előkezelni, nem kell szitaszerszámot készíteni ...
              A DTF nyomtatás során a minták a számítógépről közvetlenül a filmre nyomtatódnak amit már csak fel kell vasalni a kívánt helyre.  
              Ez lényegesen gyorsabb folyamat, mint például a hagyományos szitanyomtatás és lehetővé teszi a rövid határidők betartását és a gyors reagálást a keresletre."
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
