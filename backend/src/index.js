import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? ["https://your-app-name.onrender.com", "http://localhost:5173"]
      : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;

const __dirname = path.resolve(); // for ES modules

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// If you have a catch-all route for SPA:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

server.listen(PORT, () => {
  console.log("Server in running on PORT:" + PORT);
  connectDB();
});
