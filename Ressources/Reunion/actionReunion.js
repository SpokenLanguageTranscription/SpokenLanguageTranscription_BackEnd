const Reunion  = require('./modelReunion');
const processReunion = require('./processReunion');

module.exports={
    actionsShowMyReunions:(req,res)=>{
        processReunion.processShowMyReunions(req.body.email)
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                res.status(400).send("problème serveur.")
            })
    },
    actionShowAllReunion:(req,res)=>{
        processReunion.processShowAllReunion()
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                res.status(400).send("problème serveur.")
            })
    },
    actionPostOneReunion:(req,res)=>{
        if(req.body.idReunion.length<=0){
            res.status(400).send('Aucune code reunion')
        }else{
            let maReunion= new Reunion({
                idReunion: req.body.idReunion,
                sujet : req.body.sujet,
                createur: req.body.createur,
                participant: req.body.participant,


            });
            processReunion.processAddOneReunion(maReunion)
                .then((result)=>{
                    res.status(200).send(result)
                })
                .catch((err)=>{
                    console.log("err",err)
                    if(err==500)res.status(500).send("Code reunion utiliser")
                })
        }
    },


}