const mongoose = require("mongoose")

exports.connexion = async () => {

    try{
        const mongodb = await mongoose.connect("mongodb+srv://daaboub:PLGUSSzdrHEMcali@aminedaaboub.61brgtx.mongodb.net/dablog?retryWrites=true&w=majority")
        console.log(`The database has been successfully connected`);
    }catch(e)
    {
        console.log(e);
    }
}
