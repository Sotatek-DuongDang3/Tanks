import React, { useEffect, useRef, useState } from "react";

const BulletFlight = ({ leftPr, topPr, mouse, handle }) => {
  const [left, setLeft] = useState(leftPr);
  const [top, setTop] = useState(topPr);
  const DanRef = useRef();
  useEffect(() => {
    const vitriDan = DanRef?.current?.getBoundingClientRect();
    console.log("vị trí ban đầu",vitriDan);
    const distanceX = mouse.x - vitriDan.x; //600
    const distanceY = mouse.y - vitriDan.y; //400

    const interval = setInterval(() => {
      const stepsX = distanceX / 50; //=== 12
      const stepsY = distanceY / stepsX; //1 x 12 === 12

      setLeft((prevLeft) => prevLeft + 50);
      setTop((prevTop) => prevTop + stepsY);
    }, 100);

    const observer = new MutationObserver((mutationList) => {
      let vitridann22 
      mutationList.map((mutaTion)=>{
        vitridann22 = mutaTion.target.getBoundingClientRect()
      })
      console.log("click",vitridann22);
      console.log("mouse",mouse);

      if ( vitridann22.x <= mouse?.x  ||  vitridann22.x >= mouse?.x) {
        clearInterval(interval);
        console.log("voo");
        handle();
      }
    });
    observer.observe(DanRef?.current, { attributes: true });

    return () => {
      console.log("clear reuturn");
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={DanRef}
      style={{
        position: "absolute",
        top: top,
        transform: "translate(-50%, -50%)",
        width: "10px",
        height: "10px",
        backgroundColor: "blue",
        borderRadius: "50%",
        left: left,
        transition: "0.2s linear",
      }}
    />
  );
};

export default BulletFlight;
