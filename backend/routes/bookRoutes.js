import express from "express";
import {createBook, getBooks, getBookById, updateBook, deleteBook, updateBookCover} from "../controller/bookController.js"
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Apply Protect middleware to all routes in this file 
router.use(protect);

router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").put(upload, updateBookCover);

export default router;