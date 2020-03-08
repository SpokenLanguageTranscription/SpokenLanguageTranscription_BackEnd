const express= require("express")
const router = express.Router()
const bodyParser= require("body-parser")
const actionReunion=require("./actionReunion")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post("/",actionReunion.actionPostOneReunion)


module.exports= router;