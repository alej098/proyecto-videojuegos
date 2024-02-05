const { getvideogameByNombre }= require('../controllers/AllvideogameName')

const getvideogameByNombreHandler = async (req, res) => {
    try {
      const { nombre } = req.query;
      const response = await getvideogameByNombre(nombre);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  module.exports = { getvideogameByNombreHandler};