const { Videogame, Genres } = require("../db");
const axios = require("axios");
const API_KEY = process.env.API_KEY;

const videogameID = async (id) => {
  let videogameDB;

  if (isNaN(id)) {
    try {
      videogameDB = await Videogame.findByPk(id, {
        include: [
          {
            model: Genres,
            as: "genres",
            attributes: ["name", "id"],
            through: { attributes: [] },
          },
        ],
      });
      return videogameDB
      
    } catch (error) {
        console.log({ error: error.message });
    }
  } else {
    try {
      const response = (
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      ).data;

      if (videogameDB) {
        return videogameDB;
      } else {
        return response;
      }
    } catch (error) {
        console.log({ error: error.message });
    }
  }
};
module.exports = { videogameID };
