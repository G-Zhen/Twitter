// npm run dev in project root
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // port 5000 isn't available for macOS

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); 
    connectMongoDB();
})