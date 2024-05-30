import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import checkQueryLimit from '@/middleware/checkQueryLimit';

dotenv.config();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const validModels = {
        'Claude 3 Haiku': 'claude-3-haiku-20240307',
        'Claude 3 Sonnet': 'claude-3-sonnet-20240229',
        'Claude 3 Opus': 'claude-3-opus-20240229',
    };

    const { prompt, model } = req.body as { prompt: string, model: keyof typeof validModels };

    if (!prompt) {
        res.status(400).json({ message: 'Prompt is required' });
        return;
    }

    try {
        const anthropic = new Anthropic();

        const selectedModel = model in validModels ? validModels[model] : validModels['Claude 3 Haiku'];

        const response = await anthropic.messages.create({
            model: selectedModel,
            max_tokens: 1024,
            messages: [
                { "role": "user", "content": prompt }
            ]
        });

        const text = response.content[0].text;
        res.status(200).json({ response: text });
    } catch (error) {
        console.error('Error fetching data from Anthropic:', error);
        res.status(500).json({ error: 'Failed to fetch data from Anthropic.' });
    }
}


export default checkQueryLimit(handler)