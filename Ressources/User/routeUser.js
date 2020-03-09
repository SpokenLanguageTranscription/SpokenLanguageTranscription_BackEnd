const router = require('express').Router();
const bodyParser= require("body-parser")

router.use(bodyParser.json());
const actionUser = require('./actionUser');
const isAuthenticated = (req,res,next) => {

    if(res.locals.isAuthenticated){
        return next()

    }else{
        req.flash('error','il faut senregistrer avant! ')
        res.status(404).send("il faut s'enregistrer")

    }
}

//Autorisation
const isNotAuthenticated = (req,res,next) => {

    if(res.locals.isAuthenticated){
        req.flash('error','désolé vous êtes déjà connecté')
        res.status(404).send("vous êtes déjà connecté")

    }else{
        return next()

    }
}

router.post('/register',isNotAuthenticated,actionUser.register);

router.post('/login',actionUser.login);
router.post('/decrypt',isAuthenticated,actionUser.decrypt);

module.exports= router;
