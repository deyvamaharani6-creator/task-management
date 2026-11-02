// import express from "express";
// import postRoute from "./routes/post-routes";

// const app = express();
// const PORT = 5000;

// app.use(express.json());

// app.use("/api/v1/posts", postRoute);

// app.get("/", (req, res) => {
//   res.send("Hello Express + TypeScript");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express";
import taskRoutes from "./routes/task-routes";

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Menghubungkan route task
app.use("/tasks", taskRoutes);

// Menjalankan server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
