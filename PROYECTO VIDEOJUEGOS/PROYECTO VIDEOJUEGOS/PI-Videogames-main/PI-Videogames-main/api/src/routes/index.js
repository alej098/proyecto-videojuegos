const { Router } = require('express');
const {getAllVideogameHandler}= require('../handlers/Handlervideogames')
const {handlervideogameID}= require('../handlers/handlerVideogameID')
const { getvideogameByNombreHandler}= require('../handlers/handlervideogameName')
const {CreateHandler}= require('../handlers/handlerCreateVideogame')
const {getGenerosHandler} = require ('../handlers/handlerGeneros')
const {gamedelete}= require ('../controllers/videogame.delete')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get('/videogame/name', getvideogameByNombreHandler)
router.get('/videogame/:id', handlervideogameID)
router.get('/videogame', getAllVideogameHandler)
router.post('/videogame', CreateHandler)
router.get('/genres', getGenerosHandler)
router.delete('/videogame/name', gamedelete)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
