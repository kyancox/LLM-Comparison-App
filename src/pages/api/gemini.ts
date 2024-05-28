import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import checkQueryLimit from '@/middleware/checkQueryLimit';

dotenv.config();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { prompt, model } = req.body;

    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required.' });
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

        const validModels = ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro-latest'];
        const selectedModel = validModels.includes(model) ? model : 'gemini-pro';
        const geminiModel = genAI.getGenerativeModel({ model: selectedModel });

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;

        const text = response.text();
        res.status(200).json({ response: text });
    } catch (error) {
        console.error('Error fetching data from Google Gemini:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Gemini.' });
    }
}

export default checkQueryLimit(handler)