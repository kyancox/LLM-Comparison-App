import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import clientPromise from '@/lib/mongodb';
import { parse, serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid';

const checkQueryLimit = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('llm-comparison');
  const collection = db.collection('queries');

  // Parse cookies
  const cookies = parse(req.headers.cookie || '');
  let sessionId = cookies.sessionId;

  // If no sessionId cookie, create one
  if (!sessionId) {
    sessionId = uuidv4();
    res.setHeader('Set-Cookie', serialize('sessionId', sessionId, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 30 }));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const premiumModels = ['GPT-4o', 'GPT-4 Turbo', 'GPT-4', 'GPT-4o mini', 'Gemini 1.5 Pro', 'Gemini 1.5 Flash', 'Claude 3 Opus', 'Claude 3.5 Sonnet']

  // Count queries starting today
  const queryCount = await collection.countDocuments({
    sessionId,
    model: { $in: premiumModels },
    timestamp: { $gte: today }
  });

  if (queryCount >= 3 && premiumModels.includes(req.body.model)) {
    return res.status(429).json({ message: 'Premium query limit reached for today.' });
  }

  // If query OK, add a new query document
  await collection.insertOne({
    sessionId,
    model: req.body.model,
    timestamp: new Date()
  });

  return handler(req, res);
};

export default checkQueryLimit;

