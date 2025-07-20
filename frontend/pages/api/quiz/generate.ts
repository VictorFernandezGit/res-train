import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './prisma';

// Add type for question objects
type QuizQuestionInput = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

// Helper to generate quiz questions from wine data
function generateQuestionsFromWine(wine: any) {
  const questions: QuizQuestionInput[] = [];
  // Example: Add more sophisticated question generation as needed
  if (wine.grapeVariety) {
    questions.push({
      question: `What is the grape variety of ${wine.name}?`,
      options: [wine.grapeVariety, 'Cabernet Sauvignon', 'Merlot', 'Pinot Noir'],
      answer: wine.grapeVariety,
      explanation: `The grape variety for ${wine.name} is ${wine.grapeVariety}.`,
    });
  }
  if (wine.tier) {
    questions.push({
      question: `What is the tier of ${wine.name}?`,
      options: ['LOW', 'MEDIUM', 'HIGH'],
      answer: wine.tier,
      explanation: `The tier for ${wine.name} is ${wine.tier}.`,
    });
  }
  if (wine.description) {
    questions.push({
      question: `Which description best matches ${wine.name}?`,
      options: [wine.description, 'A robust red wine', 'A light white wine', 'A sparkling wine'],
      answer: wine.description,
      explanation: `The correct description is: ${wine.description}`,
    });
  }
  // Add more question types as needed
  return questions;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wineId, title, orgId } = req.body;
  if (!wineId) {
    return res.status(400).json({ error: 'wineId is required' });
  }
  if (!orgId) {
    return res.status(400).json({ error: 'orgId is required' });
  }

  // Fetch wine data
  const wine = await prisma.wine.findUnique({ where: { id: wineId } });
  if (!wine) {
    return res.status(404).json({ error: 'Wine not found' });
  }

  // Generate questions
  const questions = generateQuestionsFromWine(wine);
  if (questions.length === 0) {
    return res.status(400).json({ error: 'No questions could be generated for this wine.' });
  }

  // Create quiz and questions in DB
  const quiz = await prisma.quiz.create({
    data: {
      wineId: wine.id,
      title: title || `${wine.name} Quiz`,
      orgId: orgId,
      questions: {
        create: questions.map(q => ({
          question: q.question,
          explanation: q.explanation,
          options: {
            create: q.options.map(option => ({
              optionText: option,
              isCorrect: option === q.answer
            }))
          }
        })),
      },
    },
    include: { 
      questions: {
        include: {
          options: true
        }
      } 
    },
  });

  return res.status(201).json({ quiz });
} 