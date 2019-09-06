const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
//load server
require('./db/mongoose')


//setup express port
const app = express()
const port = process.env.PORT || 3000

//parse to json
app.use(express.json())

//crud routers
app.use(userRouter)
app.use(taskRouter)

//server listening
app.listen(port, () => {
    console.log('server running on port: ' + port)
})