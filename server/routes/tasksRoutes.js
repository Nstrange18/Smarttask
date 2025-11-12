import express from "express";
import Task from "../models/Tasks.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @desc   Create a new task (Protected)
 * @route  POST /api/tasks
 */
router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id, // associate task with logged-in user
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @desc   Get all tasks (Protected)
 * @route  GET /api/tasks
 */
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @desc   Update a task (Protected)
 * @route  PUT /api/tasks/:id
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @desc   Delete a task (Protected)
 * @route  DELETE /api/tasks/:id
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
