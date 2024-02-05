import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllGames, page, ordenGames, filterGames,getAllgeneros, filtererGames } from '../../redux/actions/actions';
import Cards from '../../componentes/Cards/Cards';
import SearchBar from '../../componentes/SearchBar/SearchBar'
import '../../Styles/styles.css';



const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.AllGames);
  const allGeneros= useSelector((state) => state.AllGeneros)
  console.log('log de games',allGames);
  console.log('log de generos',allGeneros);


  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllgeneros())
  }, [dispatch]);


  const pagination = (event) => {
    dispatch(page(event.target.name))
  };

  const ordenar = (order) => {
    dispatch(ordenGames(order));
  };
  
  const filters = (event) => {
    const selectedGenre = event.target.value;
    dispatch(filterGames(selectedGenre));
  };

const filterOrigen = (origen) => {
  dispatch(filtererGames(origen));  
};


  return (
    <div className='contenedor-home'>
      <div className='ir-al-formulario'>
      <Link to="/create" className="link-blanco">Formulario</Link>
      </div>

      <div className='cont-searchBar'>
        <SearchBar info={allGames} />
      </div>
      
      <div className='pagination-container'>
        <button name='prev' onClick={pagination}>Prev</button>
        <button name='next' onClick={pagination}>Next</button>
      </div>

      <div className='botones-de-ordenamiento'>
      <div className='botons-filtros'>
        <button name= "DB" onClick={() =>filterOrigen("DB")}>data_base</button>
        <button name="API" onClick={() =>filterOrigen("API")}>API</button>
          <select name='genres' onChange={filters}>{allGeneros.map((gen)=> <option value={gen.name} key={gen.id}>{gen.name} </option>)}</select>
        </div>
        <button name='AZ' onClick={() => ordenar("A-Z")}>A-Z</button>
        <button name='ZA' onClick={() => ordenar("Z-A")}>Z-A</button>
        <button name="RATING_ASCEN" onClick={() => ordenar("RATING_ASCEN")}>R-A</button>
        <button name="RATING_DESCEN" onClick={() => ordenar("RATING_DESCEN")}>R-D</button>

      </div>

      <div className='contendor-info-home'>
        <Cards info={allGames} />

        

      

      </div>
      

    </div>
  );
}

export default Home;
