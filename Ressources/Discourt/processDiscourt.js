const utilsDiscourt = require("./utilsDiscourt")

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


}


