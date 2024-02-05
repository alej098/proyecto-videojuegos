const { Genres } = require('../db');
const axios = require("axios");
const API_KEY = process.env.API_KEY;

const GetAllGeneros = async () => {
    let data = await Genres.findAll();
  
    if (!data || data.length === 0) {
      const generos = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  
      const infoApi = generos.data.results.reduce((generoList, videogame) => {
        if (videogame.name) {
          const generosVideogame = videogame.name.split(", ");
          generosVideogame.forEach((genero) => {
            if (!generoList.includes(genero)) {
              generoList.push(genero);
            }
          });
        }
        return generoList;
      }, []);
      const generosDB = await Genres.bulkCreate(
        infoApi.map((genero) => ({ name: genero }))
      );
      return generosDB;
    } else {
      return data;
    }
  };
  
  module.exports = { GetAllGeneros };
  