import {GoogleGenAI} from '@google/genai'//loads the Gemini AI library installed from npm

// console.log("API Key:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //creates a new Gemini AI client object.

// @desc Generate a book outline
// @route POST /api/ai/generate-outline
// @access Private

const generateOutline = async (req,res) => {
    try {
        console.log("generateOutline called");
        const { topic, style, numChapters, description } = req.body;

        if(!topic) {
            return res.status(400).json({ message: "Please provide a topic "})
        }

        const prompt = `You are an expert book outline generator. Create a comprehensive book outline based on the following requirements: 
        
        Topic: "${topic}" 
        ${description ? `Description" ${description}` : ""}
        Writing Style: ${style}
        Number of Chapters" ${numChapters || 5}

        Requirements:
        1. Generate exactly ${numChapters || 5} chapters
        2. Each chapter title should be clear, engaging, and follow a logical progression
        3. Each chapter description should be 2-3 sentences explaining what the chapter covers
        4. Ensure chapter build upon each other connectivity
        5. Match the "${style}" writing style in your title and description
        
        Output Format:
        Return only a valid JSON array with no additional text, markdown, or formatting. Each object must have exactly two keys: "title" and "description".

        Example structure:
        [
            {
                "title": "Chapter 1: Introduction to the topic",
                "description": "A comprehensive overview introducing the main concepts. Sets the foundation for understanding the subject matter."
            },
            {
                "title": "Chapter 1: Core Principles",
                "description": "Explore the fundamental principles and theories. Provides detailed example and real-world applications."
            }
        ]

        Generate the outline now:`;

        const response = await ai.models.generateContent({ 
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        console.log("Response:", response);

        const text = response.text;

        // Find and extract the JSON array from the response text
        const startIndex = text.indexOf("[");
        const endIndex = text.lastIndexOf("]");

        if(startIndex === -1 ||endIndex === -1) {
            console.error("Could not find JSON array in AI response:", text);
            return res.status(500).json({ message: "Failed to parse AI response, no JSON array found." });

        }

        const jsonString = text.substring(startIndex, endIndex + 1);

        // Validate if the response is valid JSON

        try {
            const outline = JSON.parse(jsonString);
            res.status(200).json({ outline })
        } catch(e) {
            console.error("Failed to parse AI response:", jsonString);
            res.status(500).json({ message: "Failed to generate a valid outline. The AI response was not valid JSON"});
        }
    }
    catch (error) {
        console.error("Error generating outline:", error);

        return res.status(500).json({
            message: "Server error during AI outline generation",
            error: error?.message,
            stack: error?.stack
        });
    }
};

// @desc Generate content for a chapter
// @route POST /api/ai/generate-chapter
// @access Private

const generateChapter =  async (req,res) => {
    try {

    }
    catch (error) {
        console.error("Error generating chapter:", error);
        res.status(500).json({ message: "Server error during AI chapter generation" });
    }
}

export {
    generateOutline,
    generateChapter,
};