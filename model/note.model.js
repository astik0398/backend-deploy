const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
title: String,
body: String,
device: String,
no_of_comments: Number,
userID: String
})

const noteModel = mongoose.model("note", noteSchema)

module.exports = {
    noteModel
}