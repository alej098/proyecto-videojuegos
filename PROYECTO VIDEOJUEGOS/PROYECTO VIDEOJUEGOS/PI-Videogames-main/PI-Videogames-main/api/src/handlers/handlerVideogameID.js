const {videogameID}= require('../controllers/AllvideogameID')


const handlervideogameID= async (req,res)=>{
    try {
        const { id } = req.params;
        if(isNaN(id)){
             const response = await videogameID(id);
        res.status(200).json(response);
        }else if(!isNaN(id)){
            const response= await videogameID(parseInt(id));
            res.status(200).json(response);
        }else{
            res.status(400).json({ error: 'ID inválido' });
        }
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports={handlervideogameID}