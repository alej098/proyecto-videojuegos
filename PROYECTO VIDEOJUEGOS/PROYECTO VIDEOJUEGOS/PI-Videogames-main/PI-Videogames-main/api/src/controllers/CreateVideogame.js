const { Videogame, Genres } = require("../db");

const Createvideogame = async (req) => {
  try {
    const { name, descripcion, platforms, background_image, released, rating, genres } = req.body;
    

    const newgame = await Videogame.create({
      name,
      descripcion,
      platforms,
      background_image,
      released,
      rating,
      iscreated: true,
    });

    if (genres && genres.length > 0) {
      for (const genre of genres) {
        const generosDB = await Genres.findOne({
          where: {
            name: genre,
          }
        });
      
        if (generosDB) {
          await newgame.addGenre(generosDB); // Utilizar addGenre en lugar de setGenres
        }
      }
    }

    return newgame;
  } catch (error) {
    console.error('Error creating videogame', error);
    throw error;
  }
};

module.exports = { Createvideogame };
