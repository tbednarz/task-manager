const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
//name takes type string, is required and trims spaces
name: {
    type: String,
    required: true,
    trim: true
},
//email takes type string, is required, trims and to lowercase
email: {
    type: String,
    unique: true,
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

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    } 

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user;
}

//hash password
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//MODEL FOR NEW USERS
const User = mongoose.model('User', userSchema)

//export model
module.exports = User