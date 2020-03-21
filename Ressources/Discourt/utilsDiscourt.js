const Reunion = require("../Reunion/modelReunion")
module.exports={

    callbackFindReunion: (id,email)=>{
        return new Promise((resolve,reject)=>{
            console.log("CallbackfindOneReunion:id/email",id,email)
            if(id!=null && email!=null){
                Reunion.findOne({idReunion: id,createur:email},(err, reunion)=> {
                    console.log("1xallbacksiscourt",err,reunion,id)
                    if (reunion){

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

            }else if(email!=null) {
                Reunion.findOne({createur:email}, {}, {sort: { createdAt: 'Desc' }},(err, reunion)=> {
                    console.log("2xallbacksiscourt",err,reunion,id)
                    if (reunion){

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

            }else{
                Reunion.findOne({idReunion: id} ,(err, reunion)=> {
                    console.log("3callbacksiscourt",err,reunion,id)
                    if (reunion){

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


            }




        })
    },

}