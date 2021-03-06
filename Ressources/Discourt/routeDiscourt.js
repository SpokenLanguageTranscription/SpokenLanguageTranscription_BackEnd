const express= require("express")
const router = express.Router()
const bodyParser= require("body-parser")
const actionDiscourt=require("./actionDiscourt")

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
router.post("/",actionDiscourt.actionPostOneDiscourt)
router.get("/:email/:idReunion",actionDiscourt.actionsShowMyDiscourt)
router.post("/indicateur1",actionDiscourt.actionsNbDiscByUser)
router.get("/:email/",actionDiscourt.actionsShowMyDiscourt)
router.post("/participant/" ,actionDiscourt.actionsShowMyDiscourtToParticipant)

module.exports= router;