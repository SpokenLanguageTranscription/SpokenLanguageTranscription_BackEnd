const router = require('express').Router();
const bodyParser= require("body-parser")

router.use(bodyParser.json());
const actionUser = require('./actionUser');


router.post('/register',actionUser.register);

router.post('/login',actionUser.login);
router.post('/decrypt',actionUser.decrypt);

module.exports= router;
