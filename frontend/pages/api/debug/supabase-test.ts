import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const tests: string[] = [];

    // Test 1: Basic connection
    tests.push('🔧 Testing basic Supabase connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('Org')
      .select('*')
      .limit(1);
    
    if (connectionError) {
      tests.push('❌ Connection failed: ' + connectionError.message);
      return res.status(500).json({ tests, error: 'Connection test failed' });
    } else {
      tests.push('✅ Connection successful');
    }

    // Test 2: List all organizations
    tests.push('🔧 Testing Org table access...');
    const { data: orgs, error: orgError } = await supabase
      .from('Org')
      .select('id, name, createdAt');
    
    if (orgError) {
      tests.push('❌ Org access failed: ' + orgError.message);
    } else {
      tests.push(`✅ Found ${orgs?.length || 0} organizations`);
      orgs?.forEach(org => {
        tests.push(`  - ${org.name} (${org.id})`);
      });
    }

    // Test 3: List users
    tests.push('🔧 Testing User table access...');
    const { data: users, error: userError } = await supabase
      .from('User')
      .select('id, email, role, supabaseId, orgId');
    
    if (userError) {
      tests.push('❌ User access failed: ' + userError.message);
    } else {
      tests.push(`✅ Found ${users?.length || 0} users`);
      users?.forEach(user => {
        tests.push(`  - ${user.email} (${user.role}) - Org: ${user.orgId}`);
      });
    }

    // Test 4: Check auth users
    tests.push('🔧 Testing Auth user access...');
    try {
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        tests.push('❌ Auth users access failed: ' + authError.message);
      } else {
        tests.push(`✅ Found ${authUsers?.users?.length || 0} auth users`);
        authUsers?.users?.forEach((user: any) => {
          tests.push(`  - ${user.email} (${user.user_metadata?.role || 'no role'}) - ID: ${user.id}`);
        });
      }
    } catch (authErr: any) {
      tests.push('❌ Auth test error: ' + authErr.message);
    }

    // Test 5: Environment variables
    tests.push('🔧 Environment check:');
    tests.push(`  - SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
    tests.push(`  - SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ Set (length: ' + supabaseServiceKey.length + ')' : '❌ Missing'}`);
    tests.push(`  - KEY starts with: ${supabaseServiceKey ? supabaseServiceKey.substring(0, 10) + '...' : 'N/A'}`);

    res.status(200).json({ 
      success: true,
      tests,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Debug test error:', error);
    res.status(500).json({ 
      error: error.message,
      tests: ['❌ Unexpected error: ' + error.message]
    });
  }
} 