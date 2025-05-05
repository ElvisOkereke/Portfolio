import { useState, useEffect } from "react";
import ThreeConTurbo from "@/components/3dProducts/ThreeConTurbo";

const MovingThreeDComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Define the boundaries for the movement
  const boundaryX = 150; // How far left/right it can move from center position
  const boundaryY = 100; // How far up/down it can move from center position
  
  // Time between position changes (in milliseconds)
  const moveInterval = 3000;
  
  useEffect(() => {
    // Function to generate a new random position
    const generateRandomPosition = () => {
      const newX = Math.floor(Math.random() * boundaryX * 2) - boundaryX;
      const newY = Math.floor(Math.random() * boundaryY * 2) - boundaryY;
      
      setPosition({ x: newX, y: newY });
    };
    
    // Initial position
    generateRandomPosition();
    
    // Set up interval for movement
    const intervalId = setInterval(generateRandomPosition, moveInterval);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div 
      className="absolute top-[30%] left-20 h-[700px] w-[700px] transition-all duration-[2000ms] ease-in-out"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)` 
      }}
    >
      <ThreeConTurbo />
    </div>
  );
};

export default MovingThreeDComponent;