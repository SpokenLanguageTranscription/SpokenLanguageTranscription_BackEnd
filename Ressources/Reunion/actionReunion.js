const Reunion  = require('./modelReunion');
const processReunion = require('./processReunion');

module.exports={


    actionPostOneReunion:(req,res)=>{
        if(req.body.phrase.length<=0){
            res.status(400).send('Aucune phrase à enregistrer')
        }else{
            let maReunion= new Reunion({
                idReunion: req.body.idReunion,
                createur: req.body.createur,
                participant: req.body.participant,
                phrase: req.body.phrase,

            });
            processReunion.processAddOneReunion(maReunion)
                .then((result)=>{
                    res.status(200).send(result)
                })
                .catch((err)=>{
                    if(err=="Find reservations methode problem"){ res.status(400).send(err) }
                    if(err=="Not found hotel"){ res.status(404).send(err) }
                    if(err=="FindOne hotel methode problem"){ res.status(400).send(err) }
                    if(err=="Not found user"){ res.status(404).send(err) }
                    if(err=="Find one user methode problem"){ res.status(400).send(err) }
                    if(err=="FindOne user methode problem"){ res.status(404).send(err) }
                    if(err=="Save reservation methode problem"){ res.status(400).send(err) }
                })
        }
    },


}