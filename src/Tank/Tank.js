import React, { useEffect, useRef, useState } from "react";
import './tank.css';
import Dan from "../dan/dan";
const Tanks = () => {
    const [direction, setDirection] = useState({ x: 1, code: 37,left:0 });
    const [directionMouse, setDirectionMouse] = useState({isDan:false});
   
    useEffect(() => {
        const handleKeyDown = (e) => {
          switch (e.which) {
            case 37:
                setDirection((prevState) => {
                  if (prevState.left > 75) {
                    return { x: -1, code: 37, left: prevState.left - 10 };
                  } else {
                    return { ...prevState };
                  }
                });
              break;
            case 39:
                setDirection((prevState) =>
                  prevState.left < 1125
                    ? { x: 1, code: 39, left: prevState.left + 10 }
                    : { ...prevState }
                );
              break;
            default:
              break;
          }
        };
      
            window.addEventListener("keydown", handleKeyDown);

        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

      useEffect(() => {
        const handleMouseClick = (event) => {
          const x = event.clientX;
          const y = event.clientY;
          setDirectionMouse({isDan:true,x,y})
        };
    
        window.document.addEventListener('click', handleMouseClick);
    
        return () => {
          window.document.removeEventListener('click', handleMouseClick);
        };
      }, []);

    const handle = () => {
      setDirectionMouse({...directionMouse,isDan:false})
    }
    return (
        <div
            style={{
                border: "1px solid black",
                height: 500,
                width: 1300,
                position: "relative",
            }}
        >
            <div
            className="tank"
                style={{
                    width: "200px",
                    height: "200px",
                    position: "absolute",
                    left:direction?.left,
                    bottom: 10,
                    transition:"0.3s linear",
                    transform: `scaleX(${direction.x})`,
                }}
            > 
            {
              directionMouse.isDan &&  <Dan leftPr={direction.left + 200} topPr={55} mouse={directionMouse} handle={handle}/>
            }
            </div>
                
            <div style={{ position: "absolute", bottom: "30px", right: 30 }}>
                <button
                    id="leftButton"
                    // className={activeButton === "leftButton" ? "active" : ""}
                >
                    Left
                </button>
                <button
                    id="rightButton"
                    // className={activeButton === "rightButton" ? "active" : ""}
                >
                    Right
                </button>
            </div>
        </div>
    );
};

export default Tanks;