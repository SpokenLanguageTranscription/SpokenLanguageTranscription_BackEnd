const express = require('express')
const router = express.Router()
const actionUser = require ('./actionUser')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;


const secret = require('../../config/secret').secretKey;

//Autorisation
const isAuthenticated = (req,res,next) => {

    if(req.isAuthenticated()){
        return next()

            }else{
        req.flash('error','il faut senregistrer avant! ')
        res.redirect('/')

}
}

//Autorisation
const isNotAuthenticated = (req,res,next) => {

    if(req.isAuthenticated()){
        req.flash('error','désolé vous êtes déjà connecté')
        res.redirect('/')

    }else{
        return next()

    }
}
router.route('/register')
  .post( (req, res,next)  => {

      actionUser.registerUser(req,res,next);
  });

router.route('/login')

    .post(passport.authenticate('local'),(req,res)=>{
        if(req.user){

            const payload = {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            };

            // sign token
            jwt.sign(payload, secret, {expiresIn: 3600}, (err, token) => {
                console.log("token",token)

                res.format ({
                    'application/json': function() {
                        res.send({
                            user: req.user,
                            success: true,
                            secretToken:token });
                    },'text/html': function() {

                        res.redirect('dashboard');
                    }
                });

            });
        }
        console.log("reqLogin",req.user,"auten:",req.isAuthenticated())




    })
/*
router.route('/profil')
    .post(passport.authenticate('local'),(req, res,next) => {
        console.log("profil requette connecté : ",req.isAuthenticated())
        actionUser.affichageProfil(req,res,next);
    })
*/



router.route('/verify')

    .post(isNotAuthenticated, (req,res,next)=> {
        actionUser.verifyUser(req,res,next);

    });

router.route('/logout')


    router.route('/desactiver/:userID')
    .put(passport.authenticate('local'),async(req, res) => {

       actionUser.desactiverCompte(req,res)
    });

    router.route('/profil')
    .post(passport.authenticate('local'),async(req, res) => {

       actionUser.updateCompte(req,res)
    });



module.exports = router;