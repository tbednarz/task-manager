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
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save() //save user
        res.status(201).send(user) //if user saves send 201 status and the user info
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}) //wait to find all users
        res.send(users) //send users
    } catch (e) {
        res.status(500).send(e) //500 status if fail
    }
})

//get user by id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id) //find a user by the id
        if (!user) {
            return res.status(404).send() //if no user send 404 not found status
        }
        res.send(user) //if found send user
    } catch (e) {
        res.status(500).send(e) //send 500 status if failed
    }
})

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id //id of user
    const updates = Object.keys(req.body) //returns a string of the requested updates
    const allowedUpdates = ['name', 'email', 'password', 'age'] //list of allowed updates
    const isValidOp = updates.every((update) => allowedUpdates.includes(update)) //checks to make sure update request is included in allowedUpdates

    if (!isValidOp) {
        return res.status(400).send({ //if update is invalid throws error
            error: 'Invalid Updates'
        })
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//create new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save() //wait for task to save and then send 201 status if okay
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e) //if fail send 400 status
    }
})
//get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({}) //find all tasks
        res.send(task) //if found tasks send them
    } catch (e) {
        res.status(500).send(e) //500 status if fail
    }
})
//get task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id // get id of input request
    try {
        const task = await Task.findById(_id) //find the task by id
        if (!task) {
            return res.status(400).send() //if no tasks send 400 status
        }
        res.send(task) //if task send task
    } catch (e) {
        res.status(500).send(e) //500 error
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', "description"]
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOp) {
        res.status(400).send({
            error: 'Invalid updates'
        })
    }
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

app.delete('/tasks/:id', async (req,res) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
        
    } catch (e) {
        res.status(500).send()
    }

})


//server listening
app.listen(port, () => {
    console.log('server running on port: ' + port)
})