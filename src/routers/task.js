const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

//create new task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save(); //wait for task to save and then send 201 status if okay
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e); //if fail send 400 status
  }
});
//get all tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks); //if found tasks send them
  } catch (e) {
    res.status(500).send(e); //500 status if fail
  }
});
//get task by id
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id; // get id of input request
  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(400).send(); //if no tasks send 400 status
    }
    res.send(task); //if task send task
  } catch (e) {
    res.status(500).send(e); //500 error
  }
});
//update a task by id
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOp = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOp) {
    res.status(400).send({
      error: "Invalid updates"
    });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => (task[updates] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

//delete a task by id
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
