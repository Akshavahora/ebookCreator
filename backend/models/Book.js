const mongoose = require("mongoose");

// Chapter Schema
const chapterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
    },
);

// Book Schema
const bookSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: "",
        },
        author: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            default: "",
        },
        chapters: [chapterSchema],
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        }, // e.g. draft, published
    },
    { timestamps: true }
);

export default mongoose.model("Book", bookSchema);

