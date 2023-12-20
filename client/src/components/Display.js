import React, { useState, useEffect } from "react";
import "./Display.css";

//Ezen a komponensen jelenik meg a feltöltött vagy generált kép a póló adott pozicícióján
const Display = ({ display }) => {
  const [customImagePositionA, setCustomImagePositionA] = useState({
    x: 0,
    y: 0,
  });
  const [customImagePositionB, setCustomImagePositionB] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetA, setDragOffsetA] = useState({ x: 0, y: 0 });
  const [dragOffsetB, setDragOffsetB] = useState({ x: 0, y: 0 });

  //Minta mozgatása egérrel
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && display.tshirtView == "A") {
        const newXA = e.clientX - dragOffsetA.x;
        const newYA = e.clientY - dragOffsetA.y;
        setCustomImagePositionA({ x: newXA, y: newYA });
      }

      if (isDragging && display.tshirtView == "B") {
        const newXB = e.clientX - dragOffsetB.x;
        const newYB = e.clientY - dragOffsetB.y;
        setCustomImagePositionB({ x: newXB, y: newYB });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffsetA, dragOffsetB]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    if(display.tshirtView=="A"){
    setDragOffsetA({
      x: e.clientX - customImagePositionA.x,
      y: e.clientY - customImagePositionA.y,
    });
  }
  if(display.tshirtView=="B"){
    setDragOffsetB({
      x: e.clientX - customImagePositionB.x,
      y: e.clientY - customImagePositionB.y,
    });
  }

    // Prevent the default drag-and-drop behavior
    e.preventDefault();
  };

  return (
    <div className="display-container">
      <h2>Display</h2>
      <div className="display-tshirt">
        <img
          className="display-tshirt-img"
          src={require(`../images/tshirts/129_${display.tshirtColor}_${display.tshirtView}_lb-min.jpg`)}
          alt="tshirt-image"
        />
        <div className="display-edit-area" onMouseDown={handleMouseDown}>
          {(() => {
            if (display.tshirtView == "A") {
              if (display.tshirtImgA) {
                return (
                  <img
                    style={{
                      width: parseInt(display.tshirtImgSizeA) + "%",
                      height: "auto",
                      left: `${customImagePositionA.x}px`,
                      top: `${customImagePositionA.y}px`,
                      border: "none",
                    }}
                    className="display-custom-img"
                    src={display.tshirtImgA}
                    alt="custom-image"
                  />
                );
              } else {
                return (
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                      left: `${customImagePositionA.x}px`,
                      top: `${customImagePositionA.y}px`,
                      border: "white solid 3px",
                      position: "absolute",
                    }}
                    className="display-custom-img"
                    src="http://via.placeholder.com/400x300"
                    alt="custom-image"
                    draggable="false" // Disable default drag-and-drop behavior
                  />
                );
              }
            }
            if (display.tshirtView == "B") {
              if (display.tshirtImgB) {
                return (
                  <img
                    style={{
                      width: parseInt(display.tshirtImgSizeB) + "%",
                      height: "auto",
                      left: `${customImagePositionB.x}px`,
                      top: `${customImagePositionB.y}px`,
                      border: "none",
                    }}
                    className="display-custom-img"
                    src={display.tshirtImgB}
                    alt="custom-image"
                  />
                );
              } else {
                return (
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                      left: `${customImagePositionB.x}px`,
                      top: `${customImagePositionB.y}px`,
                      border: "white solid 3px",
                    }}
                    className="display-custom-img"
                    src="http://via.placeholder.com/400x300"
                    alt="custom-image"
                  />
                );
              }
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Display;
