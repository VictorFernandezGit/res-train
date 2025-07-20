"use server";

import { createClient } from "@supabase/supabase-js";
import { adminSignupSchema } from "@/lib/validations";

export type AdminSignupState = {
  error: string | null;
  success?: boolean;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function registerAdmin(
  prevState: AdminSignupState,
  formData: FormData
): Promise<AdminSignupState> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      orgName: formData.get("orgName") as string,
    };
    adminSignupSchema.parse(rawData);

    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const org = await prisma.org.create({
      data: { name: rawData.orgName },
    });

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

    if (authError) {
      await prisma.org.delete({ where: { id: org.id } });
      return { error: authError.message };
    }

    await prisma.user.create({
      data: {
        email: rawData.email,
        name: rawData.name,
        role: "ADMIN",
        supabaseId: authUser.user.id,
        orgId: org.id,
      },
    });

    await prisma.$disconnect();

    return { error: null, success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
} 