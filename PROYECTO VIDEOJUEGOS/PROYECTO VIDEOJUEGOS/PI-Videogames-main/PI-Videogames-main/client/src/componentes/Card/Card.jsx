import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ info }) => {
console.log('log de cards', info);
  const genres = Array.isArray(info.genres) ? info.genres : [];

  return (
    <div className="compo-card">

      <img src={info.background_image } alt="Imagen del juego" />

      <div>
        <Link to={`/detail/${info.id}`}className="link-blanco">
          <p>Nombre: {info.name}</p>   
        </Link>
      </div>
      <div>
          <p>rating: {info.rating}</p>   
      </div>

      <div>
        Géneros: {genres.map(genre => genre.name).join(', ')}  
      </div>

    </div>
  );
}


    
 

export default Card;
