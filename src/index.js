// THIS FILE CREATES EXPRESS APP AND RUNS ON SERVER

const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

//load server
require("./db/mongoose");

//setup express port
const app = express();
const port = process.env.PORT || 3000;

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
app.use(express.json());
//crud routers
app.use(userRouter);
app.use(taskRouter);

//EXPRESS MIDDLEWARE
//
//Without middleware: new request-> run route handler
//**
//With middleware: new request -> do something -> run route handler
//                                 ^^ runs function

//express middleware gives alot of control to customeize your app
//every express route does not need middleware

//server listening
app.listen(port, () => {
  console.log("server running on port: " + port);
});

// const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisisapotato", {
//     expiresIn: "7 days"
//   });

//   const tokenCheck = jwt.verify(token, "thisisapotato");
//   console.log(tokenCheck);
// };

// myFunction();
