import express from "express";
import authRoutes from "./routes/authroutes.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/auth", authRoutes);




app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running.",
  });
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection error:", error);
  });