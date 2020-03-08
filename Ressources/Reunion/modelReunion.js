const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reunionSchema = new Schema(
    {
        idReunion: String,
        createur : String,
        participant : String,
        phrase : String,
    }, {
        timestamps : {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)

const Reunion = mongoose.model('reunion',reunionSchema)
module.exports = Reunion


