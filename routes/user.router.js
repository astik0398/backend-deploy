const express = require('express')
const userRouter = express.Router()

const {userModel} = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post('/register', async(req, res)=> {
try {
    const {email} = req.body
    const user = await userModel.findOne({email})

    if(user){
        res.status(200).send({"msg": "User already exist, please login"})
    }
    else{
        bcrypt.hash(req.body.password, 5, async(err, hash)=> {
            if(hash){
                const user = new userModel({
                    ...req.body,
                    password: hash
                })
                await user.save()
                res.status(200).send({"msg": "user has been registered"})
            }
        })
    }
} catch (error) {
    res.status(400).send({"error": error})
}
})

userRouter.post('/login', async(req, res)=> {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({userID: user._id}, "coding")
                    res.status(200).send({"msg": "user logged in successfully", "token": token})
                }
                else{
                    res.status(200).send({"msg": "invalid credentials"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

module.exports = {
    userRouter
}