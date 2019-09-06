require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5d6039f4a9cdbf3410f1940c').then((task) => {
    console.log("task removed: "+ task)
    return Task.countDocuments({
        completed: false
    })
}).then((result) => {
    console.log(result)
}).catch((e) =>{
    console.log(e)
})




// const User = require('../src/models/user')

// // 5d6045bdb44ce30b1460eac2\

// User.findByIdAndUpdate('5d6038040ddd002d00150e73', {
//     age: 1
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({
//         age: 1
//     })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })