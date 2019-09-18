const express = require('express')
const router = new express.Router();
const Task = require('../models/task')

//create new task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save() //wait for task to save and then send 201 status if okay
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e) //if fail send 400 status
    }
})
//get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({}) //find all tasks
        res.send(task) //if found tasks send them
    } catch (e) {
        res.status(500).send(e) //500 status if fail
    }
})
//get task by id
router.get('/tasks/:id', async (req, res) => {
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
//update a task by id
router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(_id)
        updates.forEach((update) => task[updates] =req.body[update])
        await task.save()
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

//delete a task by id
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router