const utilsReunion = require("./utilsReunion")
const Reunion = require("./modelReunion")
module.exports={

    processAddOneReunion:async (newReunion)=>{



            return new Promise((resolve,reject) => {
               return  utilsReunion.callbackFindReunion(newReunion).then((rst,err)=>{
                    console.log("result",rst)
                    if(!rst){
                        console.log("Reunion (ProcessReunion/AddOneReunion)",newReunion)
                        newReunion.save()
                            .then((result)=>{
                                resolve({'reunion': result})
                            })
                            .catch((err)=>{
                                reject(500);
                            })
                    }else {
                        reject(500)
                    }

                })

            })



    },processShowAllReunion:()=>{
        return new Promise((resolve,reject)=>{
            Reunion.find((err, reunion)=> {
                if (err){
                    reject(400)
                } else {
                    resolve(reunion)
                    //resolve(JSON.stringify(reunion))
                }
            })
        })
    },processShowMyReunions:(email)=>{
        return new Promise((resolve,reject)=>{
            Reunion.find({ createur: email},(err, reunion)=> {
                if (err){
                    reject(400)
                } else {
                    //resolve(JSON.stringify(reunion))
                    resolve(reunion)
                }
            })
        })
    },
    processShowMyLastReunions:(email)=>{
        return new Promise((resolve,reject)=>{
            Reunion.findOne({createur:email}, {}, {sort: { createdAt: 'Desc' }},(err, reunion)=> {

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
        })
    },


    processDeleteMyReunions:(id)=>{
        return new Promise ((resolve,reject)=>{
            Reunion.remove({idReunion: id},(err,reunion)=>{
                if(!reunion){
                    reject(404)
                } else{
                    if(err){
                        reject(400)
                    } else{
                        resolve('Reunion deleted')
                    }
                }
            })
        })
    }

}