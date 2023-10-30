const jwt = require('jsonwebtoken')
require('dotenv').config()
const {BlacklistModel} = require("../model/blacklist.model")
const express = require('express')

const auth = async (req, res, next)=> {
    const token = req.headers.authorization?.split(" ")[1]

   if(token){
    jwt.verify(token, "coding", (err, decoded)=> {
        if(decoded){
            req.body.userID = decoded.userID
            next()
        }
        else{
            res.status(200).send({"msg": "you are not authorized"})
        }
    })
   }
   else{
    res.status(400).send({"msg": "please login"})
   }
}

module.exports = {
    auth
}