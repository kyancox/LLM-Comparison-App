import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import dotenv from 'dotenv';
import checkQueryLimit from '@/middleware/checkQueryLimit';

dotenv.config();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const validModels = {
        'GPT-3.5 Turbo': 'gpt-3.5-turbo',
        'GPT-4': 'gpt-4',
        'GPT-4 Turbo': 'gpt-4-turbo',
        'GPT-4o': 'gpt-4o',
        'GPT-4o mini': 'gpt-4o-mini',
    }

    const { prompt, model } = req.body as { prompt: string, model: keyof typeof validModels };

    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required.' });
        return;
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const selectedModel = model in validModels ? validModels[model] : 'gpt-3.5-turbo';

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: selectedModel || "gpt-3.5-turbo",
        });

        const response = chatCompletion.choices[0].message.content;
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error fetching data from OpenAI: ', error);
        res.status(500).json({ error: 'Failed to fetch data from OpenAI.' });
    }


}

export default checkQueryLimit(handler)