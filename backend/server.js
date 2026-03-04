import connectDB from "./config/db.js";  // Import the function to connect to the database
import "dotenv/config";
import express from "express";
import cors from "cors";
// import path from "path";


// loads environment variables from a .env file.
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const path = require("path");  //Node’s built-in module for handling file paths

const app = express();   // Create an instance of the Express application

// Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["content-Type", "Authorization"],
    })
);

// connect to database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());  //allows backend to read JSON data from frontend

// Static folders for uploads
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});