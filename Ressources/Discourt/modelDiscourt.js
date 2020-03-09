const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reunionSchema = new Schema(
    {
        idReunion: String,
        auteur : String,
        phrase : String,
    }, {
        timestamps : {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)

const Discourt = mongoose.model('discourt',reunionSchema)
module.exports = Discourt


