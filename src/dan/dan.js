import React, { useEffect, useState } from 'react';

const BulletFlight = () => {
  const centerX = 200; // Tọa độ x trung tâm của vòng cung
  const centerY = 200; // Tọa độ y trung tâm của vòng cung
  const radius = 100; // Bán kính của vòng cung
  const duration = 5000; // Thời gian bay (ms)

  const [currentPosition, setCurrentPosition] = useState({ x: centerX, y: centerY });

  useEffect(() => {
    const start_time = Date.now();
    const interval = setInterval(() => {
      const elapsed_time = Date.now() - start_time;
      const progress = elapsed_time / duration;
      const angle = progress * 2 * Math.PI; // Góc quay tương ứng với tiến trình
      const x = centerX + Math.cos(angle) * radius; // Tính toán tọa độ x mới
      const y = centerY + Math.sin(angle) * radius; // Tính toán tọa độ y mới
      setCurrentPosition({ x, y });

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Bullet Flight</h1>
      <div
        style={{
          width: '400px',
          height: '400px',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'red',
            position: 'absolute',
            left: currentPosition.x - 5,
            top: currentPosition.y - 5,
            transition:"0.3s linear",
          }}
        />
      </div>
    </div>
  );
};

export default BulletFlight;