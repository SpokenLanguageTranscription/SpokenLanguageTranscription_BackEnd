const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Ressources/User/modelUser')
const JwtStrategy = require('passport-jwt').Strategy;
const keys = require('./secret');

const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;


const JWTStrategy   = passportJWT.Strategy;

passport.serializeUser((user,done) =>{

    done(null,user.id)
})

passport.deserializeUser(async (id,done) => {
    try{
        const user = await User.findById(id)
        done(null,user)
    }catch(error){
        done(error,null)
    }
})

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));


passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',secretOrKey : keys.secretKey,
    passReqToCallback : false
},async (email,password,done)  => {
    try{

        //check if email already exist
        const user = await User.findOne( {'email':email})
        if(!user){
            return done(null,false, {message:'User inconnu'})
        }

        //if the password is correct
        const isValid = await User.comparePasswords(password,user.password)

        if(!isValid){  return done(null,false, {message: 'mot de passe inconnu'})}
        if(!user.active){
            return done(null,false,{message : 'vous devez vérifier votre mail'})
        }
        console.log('isValid',user)
            return done(null,user)

    }catch (error) {
        console.log("errorpassport",error)
        //return done(error,false)
    }
}))


