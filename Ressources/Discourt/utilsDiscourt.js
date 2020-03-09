const Reunion = require("../Reunion/modelReunion")
module.exports={

    callbackFindReunion: (id)=>{
        return new Promise((resolve,reject)=>{
            Reunion.findOne({idReunion: id},(err, reunion)=> {
                if (reunion){
                    console.log("Code reunion introuvable")
                    resolve(reunion)
                } else{
                    if (err){
                        console.log('problème de recherche')
                        reject('problème du callback du recherche')
                    } else{
                        resolve(false)
                    }
                }
            })
        })
    },

}