import React from "react";
import { Link } from "react-router-dom";
// import '../../Styles/styles.css'
const Navjar = () => {
  return (
    <div>
      <div className="navbar-cont">
        <Link to="/home">Home</Link>
        <Link to="/create">Formulario</Link>
      </div>
    </div>
  );
};

export default Navjar;
