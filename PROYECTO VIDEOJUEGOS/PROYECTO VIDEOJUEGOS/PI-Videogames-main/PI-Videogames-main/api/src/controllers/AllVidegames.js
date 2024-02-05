const { Videogame, Genres } = require('../db');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

const getVideogame = async () => {
  return await Videogame.findAll({
    include: [
      {
        model: Genres,
        as: 'genres',
        attributes: ['name', 'id'],
        through: { attributes: [] },
      },
    ],
  });
};

const getVideogameAPI = async (page) => {
  const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
  return response.data;
};

const getAllVideogames = async () => {
  const videogamesDB = await getVideogame();
  let allGames = [];
  for (let i = 1; i <= 5; i++) {
    const videogamesAPI = await getVideogameAPI(i);
    allGames.push(...videogamesAPI.results);
  }
  return [...videogamesDB, ...allGames];
};

module.exports = {
  getAllVideogames,
};
