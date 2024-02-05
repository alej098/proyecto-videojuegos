const {GetAllGeneros}= require('../controllers/Allgeneros')


const getGenerosHandler= async (req, res)=>{
    try {
        const response= await GetAllGeneros()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports={getGenerosHandler}