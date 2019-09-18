const mongoose = require('mongoose')
//MODEL FOR NEW TASK
const Task = mongoose.model('Task', {
    //description takes in string, trims space, and is required
    description: {
        type: String,
        trim: true,
        required: true
    },
    //competed is a boolean defaulted to false
    completed: {
        type: Boolean,
        default: false
    }
})


//export model.
module.exports = Task