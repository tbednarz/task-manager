require('../src/db/mongoose')

const User = require('../src/models/user')
const Task = require('../src/models/task')

// 5d6045bdb44ce30b1460eac2\

// User.findByIdAndUpdate('5d6038040ddd002d00150e73', {
//         age: 1
//     }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) =>{
//     console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })

// const updateAgeAndCount = async (id, age) => {
//    const user = await User.findByIdAndUpdate(id, {age})
//    const count = await User.countDocuments({age})

//    return count
// }

// updateAgeAndCount('5d6038040ddd002d00150e73', 14).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false})
    
    return count
}

deleteTaskAndCount('5d604c5a8ac8d22facfc5193').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})