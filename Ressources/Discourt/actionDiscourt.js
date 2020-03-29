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
    },actionsNbDiscByUser:(req,res)=>{
        console.log("showmyDiscourt:",req.body.idReunion)
        processDiscourt.processShowMyDiscourts(req.body.idReunion,req.body.email)
            .then((result)=>{
               //
                console.log("resultat nb discourt by user :",result)
                var tableauGlobal=[] ;
                var tabFilter = 0
                var tabNoms = []

                var tabFinal=[]
                for (let x in result) tableauGlobal.push(result[x]);

                tabNoms = tableauGlobal.map((element)=>{
                    return element.auteur
                })
                tabNoms =[...new Set(tabNoms)]
                tabFinal = tabNoms.map((elem)=>{
                    tabFilter = tableauGlobal.filter((element,)=>{

                        if(elem==element.auteur)return elem

                    })
                    console.log("TabFilter",tabFilter.length)
                    return {nom:elem,NbpPhrase: tabFilter.length}
                })
                res.status(200).send(tabFinal)
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