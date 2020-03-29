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
    processShowMyDiscourts:async (idReunion,email)=>{



        return new Promise((resolve,reject) => {

            return  utilsDiscourt.callbackFindReunion(idReunion,email).then((rst,err)=>{
                console.log("result",rst)
                if(rst){
                    if(idReunion != null){
                        Discourt.find({ idReunion: idReunion},(err, reunion)=> {
                            if (err){
                                reject(400)
                            } else {
                                resolve(reunion)
                                //resolve(JSON.stringify(reunion))
                            }
                        })
                    }else{
                        Discourt.find({ idReunion: rst.idReunion},(err, reunion)=> {
                            if (err){
                                reject(400)
                            } else {
                                resolve(reunion)
                                //resolve(JSON.stringify(reunion))
                            }
                        })

                    }


                }else {
                    reject(500)
                }

            })

        })




    },

    processShowMyDiscourtsToParticipant:async (idReunion)=>{



        return new Promise((resolve,reject) => {

                    if(idReunion != null){
                      
                        Discourt.find({ idReunion: rst.idReunion},(err, reunion)=> {
                            if (err){
                                reject(400)
                            } else {
                                resolve(reunion)
                                //resolve(JSON.stringify(reunion))
                            }
                        })

                    }

            })




    }

}


