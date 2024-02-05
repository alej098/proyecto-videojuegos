const { Videogame,Genres } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');
const API_KEY = process.env.API_KEY;

const getvideogameByNombre = async (name) => {
  
 
    const Nombre = name.toLowerCase();
  
    
    const videogameFromDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${Nombre}%`, 
        },
      },
      include: Genres,
    });
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: API_KEY,
        search: name,
        page_size: 15
      }
    });
  const videogameFromAPI = response.data;
  
 
  const Allvideogame = [...videogameFromDB, videogameFromAPI];


  if (Allvideogame.length === 0) {
    throw new Error('No se encontraron razas de perros con ese nombre.');
  }

  return Allvideogame;
};

module.exports = { getvideogameByNombre };