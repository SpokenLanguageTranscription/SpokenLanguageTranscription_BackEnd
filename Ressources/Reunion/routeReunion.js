const express = require('express')
const router = express.Router()
const actionReunion = require ('./actionReunion.js')





router.route('/')
    .post( (req, res,next)  => {

        actionReunion.enregistrerDiscourtReunion(req,res,next);
    });