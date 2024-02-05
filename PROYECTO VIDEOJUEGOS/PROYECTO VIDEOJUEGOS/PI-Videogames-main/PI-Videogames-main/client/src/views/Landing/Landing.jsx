import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../Styles/styles.css';

const Landing = () => {
  const history = useHistory();

  const handleEnter = () => {
    history.push('/home');
  };

  return (
    <div className="landing-container">
      <div className="background-image"></div>
      <button className="enter-button-landing" onClick={handleEnter}>Ingresar</button>
    </div>
  );
};

export default Landing;