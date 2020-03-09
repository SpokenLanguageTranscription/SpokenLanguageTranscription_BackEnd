const Reunion = require("./modelReunion")
module.exports={

    callbackFindReunion: (newReunion)=>{
        return new Promise((resolve,reject)=>{
            Reunion.findOne({idReunion: newReunion.idReunion},(err, reunion)=> {
                if (reunion){
                    console.log("Code reunion déjà utiliser")
                    resolve(reunion)
                } else{
                    if (err){
                        console.log('problème de recherche')
                        reject('problème du callback du recherche')
                    } else{
                        reject('problème serveur')
                    }
                }
            })
        })
    },

}