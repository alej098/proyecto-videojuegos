import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesByid } from '../../redux/actions/actions';

const Detalle = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { id, name, background_image, description, released, rating, platforms, genres} = useSelector(state => state.gamesDetail) || {};

  useEffect(() => {
    dispatch(getGamesByid(params.id));
  }, [dispatch, params.id]);

  return (
    <div className='contenedor-detail'>
      <h1>Detalles del juego</h1>
       <Link to="/home">
            <button className="volver-btn">HOME</button>
          </Link>

      <div className='cont-img-detail'>
        <div className='image-container'>
          <img 
            src={background_image}
            alt='game'
            className='game-imagen'
          />
        </div>

        <div className='contenedor-detail-info'>
          <p className='game-info'>ID: {id}</p> 
          <p className='game-info'>Nombre: {name}</p>

          <p className='game-info'>
          Plataformas:  
          {Array.isArray(platforms)
           ? platforms.map(p => p.platform.name).join(', ')
           : platforms}
          </p>

          <p className='game-info'>Descripción: {description}</p>
          <p className='game-info'>Fecha de lanzamiento: {released}</p>
          <p className='game-info'>Rating: {rating}</p>

          <p className='game-info'>
            Géneros:
            {genres?.map(g => g.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
