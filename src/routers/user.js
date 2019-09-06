const express = require('express')
const router = new express.Router()
const User = require('../models/user')

//create new user 
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save() //save user
        res.status(201).send(user) //if user saves send 201 status and the user info
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}) //wait to find all users
        res.send(users) //send users
    } catch (e) {
        res.status(500).send(e) //500 status if fail
    }
})

//get user by id
router.get('/users/:id', async (req, res) => {
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
//update a user by id
router.patch('/users/:id', async (req, res) => {
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

//delete a user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router