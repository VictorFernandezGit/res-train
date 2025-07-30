import { NextApiRequest, NextApiResponse } from 'next'
import { createModule, getModules } from '../../../lib/actions'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('🧪 Testing LMS functionality...')

    // Test module creation
    const testModuleData = new FormData()
    testModuleData.append('title', 'Test Wine Basics Module')
    testModuleData.append('description', 'A comprehensive introduction to wine fundamentals')
    testModuleData.append('category', 'WINE')
    testModuleData.append('difficulty', 'BEGINNER')
    testModuleData.append('estimatedDuration', '30')
    testModuleData.append('tags', JSON.stringify(['basics', 'wine', 'introduction']))

    console.log('📦 Creating test module...')
    const moduleResult = await createModule(testModuleData)
    
    if (moduleResult.error) {
      console.error('❌ Module creation failed:', moduleResult.error)
      return res.status(500).json({ 
        error: 'Module creation failed', 
        details: moduleResult.error 
      })
    }

    console.log('✅ Module created successfully:', moduleResult.module?.id)

    // Test module retrieval
    console.log('📋 Fetching modules...')
    const modulesResult = await getModules({ limit: 10 })
    
    if (modulesResult.error) {
      console.error('❌ Module retrieval failed:', modulesResult.error)
      return res.status(500).json({ 
        error: 'Module retrieval failed', 
        details: modulesResult.error 
      })
    }

    console.log('✅ Modules retrieved successfully:', modulesResult.modules?.length)

    return res.status(200).json({
      success: true,
      message: 'LMS functionality test completed successfully',
      results: {
        moduleCreated: moduleResult.module,
        modulesCount: modulesResult.modules?.length || 0,
        modules: modulesResult.modules
      }
    })

  } catch (error: any) {
    console.error('❌ LMS test error:', error)
    return res.status(500).json({ 
      error: 'LMS test failed', 
      details: error.message 
    })
  }
} 