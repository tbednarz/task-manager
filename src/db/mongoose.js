const mongoose = require('mongoose')
const validator = require('validator')



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Create a task model 
const task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    }
})
//Create a User model
const User = mongoose.model('User', {
    //name takes type string, is required and trims spaces
    name: {
        type: String,
        required: true,
        trim: true

    },
    //email takes type string, is required, trims and to lowercase
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error('Email is invalid')
            }
        }
    },
    //age takes type number, defaults to 0, if input age is less that
    // 0, error is thrown
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new error('Age must be a positive number')
            }
        }

    }
})

//create new user filling in user model data
const me = new User({
    name: "   Tres",
    email: "MYEMAIL@BOINK.io",
    age: 27


})
//save new user and log to console
me.save().then((me) => {
    console.log(me)
    //throw error if went wrong
}).catch((e) => {
    console.log('ERROR', e)
})
// const task = new task({
//     description: 'Fuck the snow',
//     completed: false
// })
// task.save().then((task) => {
//     console.log(task)
// }).catch((e) => {
//     console.log("ERROR: ", e)
// })