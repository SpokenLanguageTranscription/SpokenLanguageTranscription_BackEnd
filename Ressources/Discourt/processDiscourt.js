const utilsDiscourt = require("./utilsDiscourt")
const Discourt = require("./modelDiscourt")
module.exports={

    processAddOneDiscourt:async (newDiscourt)=>{



        return new Promise((resolve,reject) => {

            return  utilsDiscourt.callbackFindReunion(newDiscourt.idReunion).then((rst,err)=>{
                console.log("result",rst)
                if(rst){
                    newDiscourt.save()
                        .then((result)=>{
                            resolve({'Discourt enregistrer !': result})
                        })
                        .catch((err)=>{
                            reject(500);
                        })
                }else {
                    reject(500)
                }

            })

        })




    },
    processShowMyDiscourts:async (idReunion)=>{



        return new Promise((resolve,reject) => {

            return  utilsDiscourt.callbackFindReunion(idReunion).then((rst,err)=>{
                console.log("result",rst)
                if(rst){

                    Discourt.find({ idReunion: idReunion},(err, reunion)=> {
                            if (err){
                                reject(400)
                            } else {
                                resolve(reunion)
                                //resolve(JSON.stringify(reunion))
                            }
                        })

                }else {
                    reject(500)
                }

            })

        })




    },

}


