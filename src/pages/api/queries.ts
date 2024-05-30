import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import {parse} from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' })
    }

    const client = await clientPromise;
    const db = client.db('llm-comparison');
    const collection = db.collection('queries');
  
    // Parse cookies
    const cookies = parse(req.headers.cookie || '');
    const sessionId = cookies.sessionId;
  
    // If no sessionId cookie, error 
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID not found.' });
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const premiumModels = ['GPT-4o', 'GPT-4 Turbo', 'GPT-4', 'Gemini 1.5 Pro', 'Gemini 1.5 Flash', 'Claude 3 Opus'];
  
    // Count premium queries today 
    const queryCount = await collection.countDocuments({
      sessionId,
      model: { $in: premiumModels },
      timestamp: { $gte: today }
    });
  
    res.status(200).json({ count: queryCount });
}