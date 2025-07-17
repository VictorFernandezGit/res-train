import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wineId } = req.query;
  if (!wineId || typeof wineId !== 'string') {
    return res.status(400).json({ error: 'wineId is required' });
  }

  // Fetch the quiz for the wine, including questions
  const quiz = await prisma.quiz.findFirst({
    where: { wineId },
    include: { questions: true },
  });

  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found for this wine' });
  }

  return res.status(200).json({ quiz });
} 