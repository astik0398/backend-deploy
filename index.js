const express = require('express')
const app = express()
require('dotenv').config()
const {connection} = require('./db')
const {userRouter} = require('./routes/user.router')
const {noteRouter} = require('./routes/note.router')

app.use(express.json())
app.use("/users", userRouter)
app.use("/posts", noteRouter)

app.listen(4500, async()=> {
    try {
        await connection
        console.log('connected to the db');
        console.log(`server running at port ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})