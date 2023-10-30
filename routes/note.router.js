const express = require('express')
const noteRouter = express.Router()

const {noteModel} = require('../model/note.model')
const {auth} = require('../middleware/auth.middleware')

noteRouter.use(auth)

noteRouter.get('/', async(req, res)=> {
    try {
        const note = await noteModel.find({userID: req.body.userID})
        res.status(200).send(note)
    } catch (error) {
        res.status(400).send({"msg": error})
    }
})

noteRouter.post('/add', async (req, res)=> {
    const {userID} = req.body

    try {
        const note = new noteModel({
            ...req.body,
            userID
        })
        await note.save()
        res.status(200).send({"msg": "note has been successfully added"})
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

noteRouter.patch("/update/:noteID", async (req, res)=> {
    const {noteID} = req.params
    const note = await noteModel.findOne({_id: noteID})

    try {
        if(req.body.userID == note.userID){
            await noteModel.findByIdAndUpdate({_id: noteID}, req.body)
            res.status(200).send({"msg": `note with ID: ${noteID} has been updated`})
        }
        else {
            res.status(200).send({"msg": "you are not authorized"})
        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

noteRouter.delete("/delete/:noteID", async (req, res)=> {
    const {noteID} = req.params
    const note = await noteModel.findOne({_id: noteID})

    try {
        if(req.body.userID == note.userID){
            await noteModel.findByIdAndDelete({_id: noteID})
            res.status(200).send({"msg": `note with ID: ${noteID} has been deleted`})
        }
        else {
            res.status(200).send({"msg": "you are not authorized"})
        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

module.exports = {
    noteRouter
}