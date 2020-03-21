

//********Modules************/


//pour controler les inputs du password
const Joi    = require('joi')
const processUser = require('./processUsers')
const passport = require('passport')
const randomstring = require('randomstring')
const mailer = require('../../misc/mailer')
const mailHTML = require('./mailRegistration')
const userSchema = Joi.object().keys({
      email : Joi.string().email().required(),
      password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      confirmationPassword : Joi.any().valid(Joi.ref('password')).required()
})

module.exports = {

    register(req, res, body) {
        console.log("Hello")
        processUser.register(req, res, body)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
            .catch((err) => {
                res.status(409).json(err)
            })
    },

    login(req, res) {
        processUser.login(req, res)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                console.log("err",err)
                res.status(400).send(err.Error)
            })


    },
    decrypt(req, res) {
        processUser.getuserprofile(req, res)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            })

    },


}