// THIS FILE CREATES EXPRESS APP AND RUNS ON SERVER

const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

//load server
require("./db/mongoose");

//setup express port
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//crud routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server running on port: " + port);
});

// const Task = require("./models/task");
// const User = require("./models/user");
// const main = async () => {
//   // const task = await Task.findById("5e18c0b099802b2d808ccf78");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("5e18bfb374218c2884f62ae6");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();

// const pet = {
//   name: "Dennis"
// };
// pet.toJSON = function() {
//   return {};
// };
// console.log(JSON.stringify(pet));
//REGISTER MIDDLEWARE
//example, if method called is a GET request log message
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("Get requests are disabled");
//   } else {
//     next();
//   }
// });
//call next() to continue calling the route handler
// app.use((req, res, next) => {
//   res.status(503).send("Service Offline");
// });

//parse to json
//EXPRESS MIDDLEWARE
//
//Without middleware: new request-> run route handler
//**
//With middleware: new request -> do something -> run route handler
//                                 ^^ runs function

//express middleware gives alot of control to customeize your app
//every express route does not need middleware

//server listening

// const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisisapotato", {
//     expiresIn: "7 days"
//   });

//   const tokenCheck = jwt.verify(token, "thisisapotato");
//   console.log(tokenCheck);
// };

// myFunction();
