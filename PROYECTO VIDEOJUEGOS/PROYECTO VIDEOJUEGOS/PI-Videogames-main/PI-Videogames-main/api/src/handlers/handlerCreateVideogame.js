const { Createvideogame } = require('../controllers/CreateVideogame');

const CreateHandler = async (req, res) => {
  try {
    const newgame = await Createvideogame(req);
    res.status(201).json(newgame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { CreateHandler };
