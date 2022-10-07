import jwt from "jsonwebtoken";

import Task from "../models/task"

export const requireSignIn = (req, res, next) => {
  // console.log('REQUEST HEADERS => ', req.headers)
  try{
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decoded
    // console.log("DECODED => ", decoded, "REQUEST USER => ", req.user)
    next()
  }catch(error) {
    console.log(error)
    return res.status(401).json(error)
  }
}

export const canUpdateDelete = async (req, res, next) => {
  // console.log('REQUEST HEADERS => ', req.headers)
  try{

    const task = await Task.findById(req.params.taskId)

    if(task.postedBy._id != req.user._id){
      return res.status(400).send("Unauthorized")
    }
    next()
  }catch(error) {
    console.log(error)
    return res.status(401).json(error)
  }
}