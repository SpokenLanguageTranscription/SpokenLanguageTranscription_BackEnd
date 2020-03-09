const utilsReunion = require("./utilsReunion")
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




    },


}