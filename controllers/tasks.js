const task = require("../models/task");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await task.find({}, { _id: 0, __v: 0 });
  res
    .status(200)
    .json({ success: true, data: { tasks, amount: tasks.length } });
});

const createTask = async (req, res) => {
  try {
    const newTask = await task.create(req.body);
    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const getTask = await task.findOne({ _id: taskID }, { _id: 0, __v: 0 });
  if (!getTask) {
    // const error = new Error("Task not found");
    // error.status = 404;
    // return next(error);

    return next(createCustomError(`No task with id: ${taskID}`, 404));

    // res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ getTask });
});

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const deleteTask = await task.findOneAndDelete({ _id: taskID });
    if (!deleteTask) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ deleteTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const updateTask = await task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateTask) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ updateTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const editTask = await task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!editTask) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ editTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
