// frontend/pages/api/user/profile.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { supabaseId } = req.body

  if (!supabaseId) {
    return res.status(400).json({ error: 'Supabase ID required' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { supabaseId },
      select: { 
        id: true,
        role: true, 
        name: true, 
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ 
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 