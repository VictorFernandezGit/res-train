import type { NextApiRequest, NextApiResponse } from 'next'
import { addStaffMember } from '@/lib/actions'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Use one of your existing org IDs from the debug output
    const testOrgId = 'o3tcpnpvmbf8n7qqq65u0066'; // MIAMI WINGZ
    
    const staffData = {
      name: "Test Staff Member",
      email: `test-staff-${Date.now()}@test.com`,
      role: "STAFF",
      password: "testpassword123"
    };

    console.log('🔧 Testing staff creation with:', { testOrgId, staffData });

    const result = await addStaffMember(testOrgId, staffData);

    console.log('🔧 Staff creation result:', result);

    res.status(200).json({
      success: !result.error,
      result: result,
      testData: { testOrgId, staffData },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Debug staff creation error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 