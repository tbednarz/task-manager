const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task= new Task({description:'Fuck the snow', completed: false})
task.save().then((task) =>{
    console.log(task)
}).catch((e) => {
    console.log("ERROR: ", e)
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({name:'Tres', age: 27})
me.save().then((me) =>{
    console.log(me)
}).catch((e) => {
    console.log('ERROR', e)
})