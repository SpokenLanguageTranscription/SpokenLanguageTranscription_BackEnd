//********Modules************/


//pour controler les inputs du password
const Joi    = require('joi')
const User = require('./modelUser')
const processUser = require('./processUsers')
const passport = require('passport')
const randomstring = require('randomstring')
const mailer = require('../../misc/mailer')
const mailHTML = require('./mailRegistration')
const userSchema = Joi.object().keys({
      email : Joi.string().email().required(),
      password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      confirmationPassword : Joi.any().valid(Joi.ref('password')).required()
})

module.exports = {
//===========Cette methode permet d'ajouter un utlisateur ds la BDD========
//=========================================================================
    registerUser: async function (req, res, next) {
        try {


            const result = Joi.validate(req.body, userSchema)
            console.log('result', result)

            if (result.error) {
                req.flash('error', 'Données non valide, essayer une nouvelle fois s\'il vous plait.')
                return
            }

            let userExist = false
            await processUser.verifUser({username : result.value.username,email:result.value.email})
                .then((retour)=>{
                    if(retour){

                        console.log('resultat verification mail',retour)
                        req.flash('error', 'Email existe déja')
                        //res.redirect('/users/register')
                        userExist = true
                        return
                    }

                })
                .catch((typeErr)=>{
                  if(typeErr){
                      res.status(400).json({
                          "message" : typeErr
                      })
                      return
                  }

                })


            if(userExist) return userExist
            console.log('userExist',userExist)
            //Cryptage du password
            const hash = await User.hashPassword(result.value.password)
            //console.log('hash',hash)

            //generation du secret token
            const secretToken = randomstring.generate()
            result.value.secretToken = secretToken

            // flag le compte comme inactive
            result.value.active = false

            //Enregistrer utilisateur dans la BD
            delete result.value.confirmationPassword
            result.value.password = hash
            console.log('new value ', result.value)

            //const newUser = await new User(result.value)
               await processUser.creerUser(result.value)
                .then(  (retour)=>{
                    if(retour){
                        //console.log('ressss',res)
                        res.status(200).send({data: "Utilisateur enregistrer avec succès. Vérifier votre mail s'il vous plait"});
                        req.flash('success', 'verifier votre mail sil vous plait.')

                    }


                })
                .catch((error)=>{
                    if(error){
                        console.log('erreeeeeur',error)
                    }


                })


           console.log('mailsender', mailHTML.preparationHTML((secretToken)))

            const mail =  mailer.sendEmail('wadica2@hotmail.fr',result.value.email, '[MOBY] verification mail', mailHTML.preparationHTML((secretToken)))
            //const mail =  mailer.sendEmail('mdoubobobarry07ca@gmail.com',result.value.email, '[MOBY] verification mail', mailHTML.preparationHTML((secretToken)))

           console.log('mail', mail)

        } catch (error) {
            next(error)
        }
    },async affichageProfil (req,res,next){
    try{

        let user= await processUser.affichageUser(req.body.email)
            .then((data)=>{
                if(data!=null){
                    console.log("data",data)
                    res.format ({
                        'application/json': function() {
                            res.send({ data: data });
                        }
                    });

                }

            })


        return user

    }catch (error) {
        next(error)
    }
},

    async verifyUser(req, res,next){
        try {


            const secretToken = req.body.secretToken
            console.log("token",req.body.secretToken)
            //chercher le compte qui matche avec ce secretToken
            const user = await User.findOne({'secretToken': secretToken.trim()})
            if (!user) {
                req.flash('error', 'aucun utilisateur trouvé')
                res.redirect('verify');
                return
            }
            user.active = true
            //user.secretToken = '';
            await user.save()
            req.flash('success', 'Merci ! maintenant vous pouvez vous connecter')
            res.redirect('login')
        } catch (error) {
            next(error)
        }
    },

    desactiverCompte : async function(req,res){
        let userID = req.params.userID
        
        processUser.desactiverCompte(userID);
        res.json({message: 'Utilisateur désactivé'})

    },

    updateCompte : async function(req,res){
        let userID = req.user.id
        console.log('id user function update ::', userID)
        const compte = await processUser.updateCompte(userID, req.body);
        //res.json({message: 'Compte mis à jour!'})
        res.send(compte);

    }
}






