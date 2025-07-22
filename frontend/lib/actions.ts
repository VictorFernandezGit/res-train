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
      // Cleanup: delete auth user and org if user record creation failed
      await supabase.auth.admin.deleteUser(authUser.user.id);
      await supabase.from('Org').delete().eq('id', org.id);
      return { error: "Failed to create user record: " + userInsertError.message };
    }

    return { error: null, success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
} 