
import Task from "../models/task";

// sendgrid
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

export const task = async (req, res) => {
  console.log("POST TASK");
  try {
    const task = await new Task({
      task: req.body.content,
      postedBy: req.user._id
    }).save()

    const data = await Task.findById(task._id).populate("postedBy", "name")
    res.json(data)
  } catch (err) {
    console.log(err);
  }
};

export const tasks = async (req, res) => {
  console.log("GET TASKS");
  try {
    const perPage = 6
    const page = req.query.page ? req.query.page : 1

    const tasks = await Task.find()
      .skip((page - 1) * perPage)
      .populate("postedBy", "name")
      .sort({createdAt: -1})
      .limit(perPage)
    res.json(tasks)
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  console.log("UPDATE TASK");
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true}).populate("postedBy", "name")
    res.json(task)
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  console.log("REMOVE TASK");
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId)
    res.json(task)
  } catch (err) {
    console.log(err);
  }
};

export const taskCount = async (req, res) => {
  console.log("GET TASK COUNT")
  try{
    const count = await Task.countDocuments()
    res.json(count)
  }catch(err){
    console.log(err)
  }
}
