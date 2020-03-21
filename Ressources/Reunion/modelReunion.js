const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reunionSchema = new Schema(
    {
        idReunion: String,
        sujet : String,
        createur : String,
        participants : String,

    }, {
        timestamps : {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)

const Reunion = mongoose.model('reunions',reunionSchema)
module.exports = Reunion


