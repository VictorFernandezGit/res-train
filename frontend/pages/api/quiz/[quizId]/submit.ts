import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { quizId } = req.query;
  const { userId, answers } = req.body;

  if (!quizId || typeof quizId !== 'string') {
    return res.status(400).json({ error: 'quizId is required' });
  }
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId is required' });
  }
  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: 'answers must be an array' });
  }

  // Fetch quiz and questions
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  // Calculate score
  let score = 0;
  quiz.questions.forEach((q, idx) => {
    if (answers[idx] && answers[idx] === q.answer) {
      score++;
    }
  });

  // Save result
  const result = await prisma.quizResult.create({
    data: {
      quizId,
      userId,
      answers,
      score,
    },
  });

  return res.status(201).json({ result, score, total: quiz.questions.length });
} 