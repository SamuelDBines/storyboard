// StoryBoardCard.tsx
import React, { useState } from 'react';
import './flip-card.css'; // Make sure the CSS file path is correct

interface FlipCardProps {
  index: number;
  CardBack?: React.ReactNode;
  flipAble?: boolean;
  children?: React.ReactNode;
}

const FlipCard: React.FC<FlipCardProps> = ({ index, CardBack, children, flipAble }: React.PropsWithChildren<FlipCardProps>) => {
  const [isFlipped, setIsFlipped] = useState(false);
  // Function to handle flip action
  const handleFlip = (e: React.MouseEvent) => {
    if (!flipAble) return;
    e.stopPropagation();
    setIsFlipped(!isFlipped); // Toggle the flip state
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} key={index} onClick={handleFlip}>
      <div className="flip-card-inner" >
        {/* Front Face of the Card */}
        <div className="flip-card-front">
          {children}
        </div>

        {/* Back Face of the Card */}
        <div className="flip-card-back">
          {CardBack}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
