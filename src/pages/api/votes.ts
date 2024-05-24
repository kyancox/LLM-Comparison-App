import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('llm-comparison');
    const collection = db.collection('votes');

    // Check if collection is empty and insert initial data if needed
    const initialData = [
        { model: 'gpt', votes: 0 },
        { model: 'gemini', votes: 0 },
        { model: 'claude', votes: 0 }
    ];

    const existingVotes = await collection.find({}).toArray();
    if (existingVotes.length === 0) {
        await collection.insertMany(initialData);
    }

    if (req.method === 'POST') {
        const { model, category } = req.body;

        if (!['gpt', 'gemini', 'claude'].includes(model)) {
            return res.status(400).json({ error: 'Invalid model' });
        }

        await collection.updateOne(
            { model }, // filter
            { $inc: { votes: 1 } }, // update 
            { upsert: true } // options
        );

        if (category) {
            await collection.updateOne(
                { model, category }, // filter
                { $inc: { votes: 1 } }, // update 
                { upsert: true } // options
            );

        }

        const votes = await collection.find({}).toArray();
        res.status(200).json({ votes });
    } else if (req.method === 'GET') {
        const { categories } = req.query;

        if (categories) {
            // Query to return only documents with category field
            const votes = await collection.find({ category: { $exists: true } }, { projection: { _id: 0 } }).toArray();
            res.status(200).json({ votes });
        }

        // Query to return total votes for models 
        const votes = await collection.find({ category: { $exists: false } }, { projection: { _id: 0, model: 1, votes: 1 } }).toArray();
        res.status(200).json({ votes });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }




}