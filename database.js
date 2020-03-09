// ********************************************************************************************
// Connecter à la base MongoDB Atlas
// ********************************************************************************************

const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://STL:stl@cluster0-dfpiv.mongodb.net/test?retryWrites=true&w=majority";

const connection = async()=>{
    await mongoose.connect(mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((res)=>{
        console.log('Successful connection to the database !')
    })
    .catch((err)=>{
        console.log('Error connecting to mongoDB Atlas.\n' , err)
    })
}
module.exports=connection