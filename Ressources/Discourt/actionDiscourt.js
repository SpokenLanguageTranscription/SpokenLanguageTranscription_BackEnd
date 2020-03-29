const Discourt  = require('./modelDiscourt');
const processDiscourt = require('./processDiscourt');

module.exports={

    actionsShowMyDiscourt:(req,res)=>{
        
        console.log("showmyDiscourt:",req.params.idReunion)
        processDiscourt.processShowMyDiscourts(req.params.idReunion,req.params.email)
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                res.status(400).send("problème serveur.")
            })
    },

    actionsShowMyDiscourtToParticipant:(req,res)=>{
        
        console.log("showmyDiscourttt:",req.body.idReunion)
        processDiscourt.processShowMyDiscourtsToParticipant(req.body.idReunion)
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                res.status(400).send("problème serveur.")
            })
    },

    actionPostOneDiscourt:(req,res)=>{
        if(req.body.idReunion.length<=0){
            res.status(400).send('Aucune code reunion')
        }else{
            let monDiscourt= new Discourt({
                idReunion: req.body.idReunion,
                auteur: req.body.auteur,
                phrase: req.body.phrase,


            });
            processDiscourt.processAddOneDiscourt(monDiscourt)
                .then((result)=>{
                    res.status(200).send(result)
                })
                .catch((err)=>{
                    console.log("err",err)
                    if(err==500)res.status(500).send("Code reunion introuvable")
                })
        }
    },


}