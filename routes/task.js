import express from "express";

const router = express.Router();

import { requireSignIn, canUpdateDelete } from "../middlewares"

import { task, tasks, update, remove, taskCount } from "../controllers/task"

router.post("/task", requireSignIn, task)
router.get("/tasks", requireSignIn, tasks)
router.put("/task/:taskId", requireSignIn, canUpdateDelete, update)
router.delete("/task/:taskId", requireSignIn, canUpdateDelete, remove)
router.get("/task-count", taskCount)

export default router;
