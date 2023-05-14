import { ReactComponentElement, useState } from 'react';
import './AnimatedDiv.css';

function AnimatedWrapper({ children }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="animated-div">
          <button onClick={handleButtonClick}>Hide</button>
          <p>This is the animated div.</p>
        </div>
      )}
    </div>
  );
}

export default AnimatedDiv;
