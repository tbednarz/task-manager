const express = require('express')
//load server
require('./db/mongoose')

//load in models
const User = require("./models/user")
const Task = require("./models/task")
//setup express port
const app = express()
const port = process.env.PORT || 3000

//parse to json
app.use(express.json())

//create new user 
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)

    })
})

//get all users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

//get user by id
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })

})

//create new task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


//server listening
app.listen(port, () => {
    console.log('server running on port: ' + port)
})