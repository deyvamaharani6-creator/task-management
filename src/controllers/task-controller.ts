
import { Request, Response } from "express";
import { Task } from "../types/task";

// Penyimpanan sementara (dummy data)
let tasks: Task[] = [
    {
        id: 1,
        title: "Belajar Express",
        description: "Mempelajari pembuatan API menggunakan Express",
        status: "pending"
    },
    {
        id: 2,
        title: "Belajar TypeScript",
        description: "Memahami tipe data pada TypeScript",
        status: "completed"
    }
];

// GET semua tugas
export const getTasks = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Berhasil mengambil semua tugas",
        data: tasks
    });
};

// GET tugas berdasarkan ID
export const getTaskById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Tugas tidak ditemukan"
        });
    }

    res.status(200).json({
        message: "Berhasil mengambil detail tugas",
        data: task
    });
};


// POST menambahkan tugas baru
export const createTask = (req: Request, res: Response) => {
    const { title, description, status } = req.body;

    // Validasi data
    if (!title || !description) {
        return res.status(400).json({
            message: "Title dan description wajib diisi"
        });
    }

    if (status && !["pending", "completed"].includes(status)) {
        return res.status(400).json({
            message: "Status harus pending atau completed"
        });
    }

    const newTask: Task = {
        id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        title,
        description,
        status: status || "pending"
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Tugas berhasil ditambahkan",
        data: newTask
    });
};


 // PUT memperbarui tugas berdasarkan ID
export const updateTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Tugas tidak ditemukan"
        });
    }

    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title dan description wajib diisi"
        });
    }

    if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({
            message: "Status harus pending atau completed"
        });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    res.status(200).json({
        message: "Tugas berhasil diperbarui",
        data: task
    });
};


 // DELETE menghapus tugas berdasarkan ID
export const deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Tugas tidak ditemukan"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Tugas berhasil dihapus",
        data: deletedTask[0]
    });
};
