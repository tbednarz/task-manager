const mongoose = require('mongoose')
const validator = require('validator')

//MODEL FOR NEW USERS
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
    //password type string, is required, min length 7, trims space
    //validates that "password" is not part of input password
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
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

//export model
module.exports = User