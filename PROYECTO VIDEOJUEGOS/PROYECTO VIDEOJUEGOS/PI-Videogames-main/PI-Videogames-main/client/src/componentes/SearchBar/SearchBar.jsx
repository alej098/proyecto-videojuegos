import React,{useState } from 'react'
import { getSearch } from '../../redux/actions/actions';
 import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const dispatch= useDispatch();

  const [game, setGame] = useState("");

  const handlerChange= (event)=>{
    setGame(event.target.value)
  }

  const handlerSubmit=(event)=>{
    event.preventDefault();
    dispatch(getSearch(game))
    document.getElementById("search").value=""

  }

  return (
   
        <form onSubmit={handlerSubmit}> 
      <input id='search' onChange={handlerChange} type="text" placeholder='Nombre' /> <input type="submit" />
    </form>
    
  )
}

export default SearchBar