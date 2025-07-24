"use server";

import { createClient } from "@supabase/supabase-js";
import { adminSignupSchema } from "./validations";
import { createId } from '@paralleldrive/cuid2';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function registerAdmin(
  prevState: { error: string | null; success?: boolean },
  formData: FormData
): Promise<{ error: string | null; success?: boolean }> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      orgName: formData.get("orgName") as string,
    };
    adminSignupSchema.parse(rawData);

    const now = new Date().toISOString();

    // Create organization using Supabase API
    const { data: orgs, error: orgError } = await supabase
      .from('Org')
      .insert([{
        id: createId(),
        name: rawData.orgName,
        createdAt: now
      }])
      .select()
      .single();

    if (orgError || !orgs) {
      return { error: "Failed to create organization: " + (orgError?.message || "Unknown error") };
    }

    const org = orgs;

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: rawData.email,
      password: rawData.password,
      email_confirm: true,
      user_metadata: {
        role: "ADMIN",
        org_id: org.id,
        org_name: rawData.orgName,
        name: rawData.name,
      },
    });

    if (authError || !authUser?.user) {
      // Cleanup: delete the org if auth user creation failed
      await supabase.from('Org').delete().eq('id', org.id);
      return { error: authError?.message || "Failed to create user account" };
    }

    // Create user record in database using Supabase API
    const { error: userInsertError } = await supabase
      .from('User')
      .insert([{
        id: createId(),
        email: rawData.email,
        name: rawData.name,
        role: "ADMIN",
        supabaseId: authUser.user.id,
        orgId: org.id,
        createdAt: now,
        updatedAt: now
      }]);

    if (userInsertError) {
      // Cleanup: delete auth user and org if database insert failed
      await supabase.auth.admin.deleteUser(authUser.user.id);
      await supabase.from('Org').delete().eq('id', org.id);
      return { error: "Failed to create user record: " + userInsertError.message };
    }

    return { 
      error: null, 
      success: true 
    };

  } catch (error: any) {
    console.error("Registration error:", error);
    return { 
      error: error.message || "An unexpected error occurred" 
    };
  }
}

export async function addStaffMember(
  orgId: string,
  staffData: { name: string; email: string; role: string; password: string }
): Promise<{ error: string | null; success?: boolean; staff?: any }> {
  try {
    console.log('🔧 addStaffMember called with:', { orgId, email: staffData.email, role: staffData.role });
    
    if (!orgId) {
      return { error: "Organization ID is required" };
    }

    // Get organization name
    const { data: orgData, error: orgFetchError } = await supabase
      .from('Org')
      .select('name')
      .eq('id', orgId)
      .single();

    if (orgFetchError) {
      console.error('❌ Error fetching org:', orgFetchError);
      return { error: "Failed to fetch organization details: " + orgFetchError.message };
    }

    console.log('✅ Organization found:', orgData.name);

    // Create user in Supabase Auth
    console.log('🔧 Creating Supabase Auth user...');
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: staffData.email,
      password: staffData.password,
      email_confirm: true,
      user_metadata: {
        role: "STAFF",
        name: staffData.name,
        org_id: orgId,
        org_name: orgData.name
      },
    });

    if (authError) {
      console.error('❌ Supabase Auth error:', authError);
      return { error: "Auth error: " + authError.message };
    }

    if (!authUser?.user) {
      console.error('❌ No auth user returned');
      return { error: "Failed to create authentication user" };
    }

    console.log('✅ Supabase Auth user created:', authUser.user.id);

    // Create user record in database
    console.log('🔧 Creating database user record...');
    const now = new Date().toISOString();
    const userPayload = {
      id: createId(),
      email: staffData.email,
      name: staffData.name,
      role: staffData.role as any,
      supabaseId: authUser.user.id,
      orgId: orgId,
      createdAt: now,
      updatedAt: now
    };

    console.log('🔧 User payload:', userPayload);

    const { data: newUser, error: userError } = await supabase
      .from('User')
      .insert([userPayload])
      .select()
      .single();

    if (userError) {
      console.error('❌ Database insert error:', userError);
      // Cleanup: delete auth user if database insert failed
      console.log('🔧 Cleaning up auth user...');
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return { error: "Database error: " + userError.message + " (Auth user cleaned up)" };
    }

    console.log('✅ Database user record created:', newUser.id);

    const staffResult = {
      id: newUser.id,
      name: staffData.name,
      email: staffData.email,
      role: staffData.role,
      progress: 0,
      status: "Active"
    };

    console.log('✅ Staff member creation completed successfully');

    return {
      error: null,
      success: true,
      staff: staffResult
    };

  } catch (error: any) {
    console.error("❌ Unexpected error in addStaffMember:", error);
    return { error: "Unexpected error: " + error.message };
  }
} 