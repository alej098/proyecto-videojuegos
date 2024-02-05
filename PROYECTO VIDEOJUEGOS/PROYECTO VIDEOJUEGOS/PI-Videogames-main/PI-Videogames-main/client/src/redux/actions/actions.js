//import actions-types
import axios from 'axios'
import { GET_GAMES, SEARCH, DETAIL, GET_GENEROS, PAGINATE, ORDEN, FILTER, FILTERER } from './action-types'

//actions creater

export function postGame(state){
  return async function(dispatch){
     try {
      await axios.post("http://localhost:3001/videogame", state)
      alert('se creo el juego exitosamente');
     } catch (error) {
      alert(error)
     }

  }

}
export function getAllGames() {
    return async function(dispatch) {
      try {
        const response = await axios.get("http://localhost:3001/videogame");
  
        if (response.status === 200) {
          dispatch({
            type: GET_GAMES,
            payload: response.data // Pasar los datos recibidos a action.payload
          });
        }
      } catch (error) {
        alert(error.message);
      }
    };
  }
  export function getSearch(name) {
    return async function (dispatch){
        try {
            const response= await axios.get(`http://localhost:3001/videogame/name?nombre=${name}`)
            dispatch({
                type: SEARCH,
                payload: response.data[0]?.results
            
        })
      
        } catch (error) {
            alert(error.response.data.error)
        }
    }
  }

  export function getGamesByid(id) {
    return async function (dispatch){
        try {
            const response= await axios.get(`http://localhost:3001/videogame/${id}`)
            dispatch({
                type: DETAIL,
                payload: response.data
            
        })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
  }
  export function getAllgeneros() {
    return async function(dispatch) {
      try {
        const response = await axios.get("http://localhost:3001/genres");
        if (response.status === 200) {
          dispatch({
            type:  GET_GENEROS,
            payload: response.data // Pasar los datos recibidos a action.payload
          });
        
        }
      } catch (error) {
        alert(error.message);
      }
    };
  }
  export function page(order) {
    return function (dispatch){
        dispatch({
            type:PAGINATE,
            payload: order
        })
    }
  
  }
  export function ordenGames(order) {
    return function (dispatch){
        dispatch({
            type:ORDEN,
            payload: order
        })
    }
  
  }
  export function filterGames(genres) {
    return function (dispatch) {
      dispatch({
        type: FILTER,
        payload: genres
      });
    };
  }
  
  export function filtererGames(order) {
    return function (dispatch) {
      dispatch({
        type: FILTERER,
        payload: order
      });
    };
  }