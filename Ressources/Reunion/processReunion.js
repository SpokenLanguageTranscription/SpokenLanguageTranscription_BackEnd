const utilsReunion = require("./utilsReunion")
const Reunion = require("./modelReunion")
module.exports={

    processAddOneReunion:async (newReunion)=>{



            return new Promise((resolve,reject) => {
               return  utilsReunion.callbackFindReunion(newReunion).then((rst,err)=>{
                    console.log("result",rst)
                    if(!rst){
                        newReunion.save()
                            .then((result)=>{
                                resolve({'Reunion enregistrer !': result})
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


}