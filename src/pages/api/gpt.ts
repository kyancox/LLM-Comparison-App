import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const {prompt, model} = req.body;

    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required.' });
        return;
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const validModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o'];
        const selectedModel = validModels.includes(model) ? model : 'gpt-3.5-turbo';

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: selectedModel || "gpt-3.5-turbo",
        });

        const response = chatCompletion.choices[0].message.content;
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error fetching data from OpenAI: ', error);
        res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
    }


}
