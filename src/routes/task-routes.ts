
import { Router } from "express";

import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task-controller";

const router = Router();

// GET semua tugas
router.get("/", getTasks);

// GET tugas berdasarkan ID
router.get("/:id", getTaskById);

// POST menambahkan tugas
router.post("/", createTask);

// PUT memperbarui tugas
router.put("/:id", updateTask);

// DELETE menghapus tugas
router.delete("/:id", deleteTask);

export default router;
