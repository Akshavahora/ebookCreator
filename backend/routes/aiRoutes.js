const router = express.Router(); 

import express from "express";
import { generateOutline, generateChapter } from "../controller/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Apply protect middleware to all routes
router.use(protect);

// Route to generate book outline
router.post('/generate-outline', generateOutline);

// Route to generate chapter content
router.post('/generate-chapter-content', generateChapter);

export default router;