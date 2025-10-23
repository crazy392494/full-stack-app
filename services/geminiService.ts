

import { GoogleGenAI } from "@google/genai";
import { ISSUE_CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const categorizeIssueWithImage = async (base64ImageData: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64ImageData,
            },
        };

        const textPart = {
            // FIX: Use Object.keys() to get an array of category names before joining.
            text: `Analyze this image of a local issue. Categorize it into one of the following: ${Object.keys(ISSUE_CATEGORIES).join(", ")}. Return only the category name as a single string. For example: "Electrical".`,
        };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        const category = response.text.trim();
        
        // Validate if the response is one of the allowed categories
        // FIX: Use Object.keys() to get an array of category names for validation.
        if (Object.keys(ISSUE_CATEGORIES).includes(category)) {
            return category;
        } else {
            // Fallback if the model returns something unexpected
            console.warn("Gemini returned an invalid category:", category);
            return "General Maintenance";
        }

    } catch (error) {
        console.error("Error categorizing issue with Gemini:", error);
        // In case of an API error, return a default category
        return "General Maintenance";
    }
};