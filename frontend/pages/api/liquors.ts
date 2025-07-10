import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COCKTAILDB_API_URL = process.env.COCKTAILDB_API_URL || 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

async function fetchCocktailDBLiquors() {
  const res = await fetch(COCKTAILDB_API_URL);
  if (!res.ok) return [];
  const data = await res.json();
  // TheCocktailDB returns { drinks: [{strIngredient1: 'Vodka'}, ...] }
  return (data.drinks || []).map((d: any) => ({ name: d.strIngredient1, source: 'cocktaildb' }));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get custom liquors from DB
    const customLiquors = await prisma.liquor.findMany();
    // Get liquors from TheCocktailDB
    const cocktailDBLiquors = await fetchCocktailDBLiquors();
    // Merge and return
    res.status(200).json({ custom: customLiquors, cocktaildb: cocktailDBLiquors });
  } else if (req.method === 'POST') {
    // Add a custom liquor
    const { name, type, description, imageUrl } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }
    try {
      const liquor = await prisma.liquor.create({
        data: { name, type, description, imageUrl },
      });
      res.status(201).json(liquor);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 