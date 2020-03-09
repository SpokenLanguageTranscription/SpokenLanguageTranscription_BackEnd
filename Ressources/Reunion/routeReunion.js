const express= require("express")
const router = express.Router()
const bodyParser= require("body-parser")
const actionReunion=require("./actionReunion")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const isAuthenticated = (req,res,next) => {
    console.log("isAuthReun",res.locals.isAuthenticated)
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
router.post("/",isAuthenticated,actionReunion.actionPostOneReunion)

router.get("/all",isAuthenticated,actionReunion.actionShowAllReunion)
router.get("/myreunions",isAuthenticated,actionReunion.actionsShowMyReunions)
module.exports= router;