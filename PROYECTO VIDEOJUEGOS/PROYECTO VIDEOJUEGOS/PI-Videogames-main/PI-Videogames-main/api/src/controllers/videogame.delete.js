const gamedelete= async (name)=>{
    try {
        await name.destroy(name);
    } catch (error) {
      console.log(error.message);  
    }
    
};
module.exports={gamedelete}