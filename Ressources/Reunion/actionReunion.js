const Reunion  = require('./modelReunion');
const processReunion = require('./processReunion');

module.exports={
    actionsShowMyReunions:(req,res)=>{
        console.log("email (ationShowMyReunion)",req.body.email)
        processReunion.processShowMyReunions(req.body.email)
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                res.status(400).send("problème serveur.")
            })
    },    actionsShowMyLastReunions:(req,res)=>{
        console.log("email (ationShowMyReunion)",req.body.email)
        processReunion.processShowMyLastReunions(req.body.email)
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                res.status(400).send("problème serveur.")
            })
    },
    actionsDeleteMyReunions:(req,res)=>{
        console.log("idReunion (ationDeleteMyReunion)",req.body.idReunion)

        processReunion.processDeleteMyReunions(req.params.idReunion)
            .then((result)=>{
                res.status(200).send(result)
            })
            .catch((err)=>{
                if (err==404) res.status(err).send("Aucune réunion trouvé.")
                if (err==400) res.status(err).send("Un problème est survenu au moment de la supression.")
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
                participants: req.body.participants,


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