"use server";

import { createClient } from "@supabase/supabase-js";
import { 
  AdminSignupSchema, 
  StaffMemberSchema,
  CreateModuleSchema,
  UpdateModuleSchema,
  CreateLessonSchema,
  UpdateLessonSchema,
  UpdateProgressSchema,
  MediaUploadSchema,
  AuditLogSchema,
  ModuleFilterSchema,
  LessonFilterSchema,
  BulkModuleOperationSchema,
  BulkLessonOperationSchema
} from "./validations";
import { createId } from '@paralleldrive/cuid2';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to get current user and validate authorization
async function getCurrentUserWithAuth(requiredRole?: string[]) {
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authUser) {
    throw new Error("Authentication required");
  }

  const { data: dbUser, error: userError } = await supabase
    .from('User')
    .select('id, email, name, role, orgId')
    .eq('supabaseId', authUser.id)
    .single();

  if (userError || !dbUser) {
    throw new Error("User not found in database");
  }

  if (requiredRole && !requiredRole.includes(dbUser.role)) {
    throw new Error(`Access denied. Required role: ${requiredRole.join(' or ')}`);
  }

  return { authUser, dbUser };
}

// Helper function to log audit events
async function logAuditEvent(action: string, userId: string, orgId: string, details?: any, tableName?: string, recordId?: string) {
  try {
    await supabase
      .from('AuditLog')
      .insert([{
        id: createId(),
        action,
        details,
        tableName,
        recordId,
        userId,
        orgId,
        createdAt: new Date().toISOString()
      }]);
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Don't throw - audit logging failure shouldn't break the main operation
  }
}

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

    AdminSignupSchema.parse(rawData);

    const now = new Date().toISOString();

    // Create organization
    const { data: orgs, error: orgError } = await supabase
      .from('Org')
      .insert([{
        id: createId(),
        name: rawData.orgName,
        createdAt: now
      }])
      .select()
      .single();

    if (orgError) {
      throw new Error(`Error creating organization: ${orgError.message}`);
    }

    const org = orgs;

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: rawData.email,
        password: rawData.password,
        email_confirm: true,
        user_metadata: {
          name: rawData.name,
          role: "ADMIN",
          org_id: org.id,
          org_name: org.name
        }
      });

      if (authError) {
        throw new Error(`Error creating auth user: ${authError.message}`);
      }

      const authUser = authData.user;
      if (!authUser) {
        throw new Error("No user returned from auth creation");
      }

      // Create user record
      const { error: userInsertError } = await supabase
        .from('User')
        .insert([{
          id: createId(),
          email: rawData.email,
          name: rawData.name,
          role: "ADMIN",
          supabaseId: authUser.id,
          orgId: org.id,
          createdAt: now,
          updatedAt: now
        }]);

      if (userInsertError) {
        // Cleanup: delete auth user and org if user creation fails
        await supabase.auth.admin.deleteUser(authUser.id);
        await supabase.from('Org').delete().eq('id', org.id);
        throw new Error(`Error creating user: ${userInsertError.message}`);
      }

      return { error: null, success: true };

    } catch (error: any) {
      // Cleanup organization if anything fails after org creation
      await supabase.from('Org').delete().eq('id', org.id);
      throw error;
    }

  } catch (error: any) {
    return { error: error.message || "Registration failed" };
  }
}

export async function addStaffMember(orgId: string, staffData: { name: string; email: string; role: string; password: string }) {
  try {
    const { dbUser } = await getCurrentUserWithAuth(['ADMIN']);
    
    if (dbUser.orgId !== orgId) {
      throw new Error("Access denied: Cannot add staff to different organization");
    }

    StaffMemberSchema.parse(staffData);

    const now = new Date().toISOString();

    // Get org name for metadata
    const { data: org, error: orgError } = await supabase
      .from('Org')
      .select('name')
      .eq('id', orgId)
      .single();

    if (orgError || !org) {
      throw new Error("Organization not found");
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: staffData.email,
      password: staffData.password,
      email_confirm: true,
      user_metadata: {
        name: staffData.name,
        role: staffData.role,
        org_id: orgId,
        org_name: org.name
      }
    });

    if (authError) {
      throw new Error(`Error creating auth user: ${authError.message}`);
    }

    const authUser = authData.user;
    if (!authUser) {
      throw new Error("No user returned from auth creation");
    }

    // Create user record
    const { data: users, error: userInsertError } = await supabase
      .from('User')
      .insert([{
        id: createId(),
        email: staffData.email,
        name: staffData.name,
        role: staffData.role as "STAFF" | "MANAGER",
        supabaseId: authUser.id,
        orgId: orgId,
        createdAt: now,
        updatedAt: now
      }])
      .select()
      .single();

    if (userInsertError) {
      // Cleanup auth user if user creation fails
      await supabase.auth.admin.deleteUser(authUser.id);
      throw new Error(`Error creating user: ${userInsertError.message}`);
    }

    // Log audit event
    await logAuditEvent(
      'STAFF_MEMBER_CREATED',
      dbUser.id,
      orgId,
      { staffEmail: staffData.email, staffRole: staffData.role },
      'User',
      users.id
    );

    return { error: null, staff: users };

  } catch (error: any) {
    console.error("Error adding staff member:", error);
    return { error: error.message || "Failed to add staff member" };
  }
}

// ===== MODULE MANAGEMENT =====

export async function createModule(formData: FormData) {
  try {
    const { dbUser } = await getCurrentUserWithAuth(['ADMIN', 'MANAGER']);
    
    const rawData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
      category: formData.get('category') as string,
      difficulty: formData.get('difficulty') as string,
      estimatedDuration: formData.get('estimatedDuration') ? parseInt(formData.get('estimatedDuration') as string) : undefined,
      prerequisites: formData.get('prerequisites') ? JSON.parse(formData.get('prerequisites') as string) : [],
      tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [],
      orderIndex: formData.get('orderIndex') ? parseInt(formData.get('orderIndex') as string) : undefined,
    };

    const validatedData = CreateModuleSchema.parse(rawData);
    
    const now = new Date().toISOString();

    const { data: module, error } = await supabase
      .from('Module')
      .insert([{
        id: createId(),
        ...validatedData,
        orgId: dbUser.orgId,
        createdAt: now,
        updatedAt: now
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating module: ${error.message}`);
    }

    // Log audit event
    await logAuditEvent(
      'MODULE_CREATED',
      dbUser.id,
      dbUser.orgId,
      { moduleTitle: validatedData.title, category: validatedData.category },
      'Module',
      module.id
    );

    return { success: true, module };
  } catch (error: any) {
    console.error("Error creating module:", error);
    return { error: error.message || "Failed to create module" };
  }
}

export async function updateModule(moduleId: string, formData: FormData) {
  try {
    const { dbUser } = await getCurrentUserWithAuth(['ADMIN', 'MANAGER']);
    
    const rawData = {
      id: moduleId,
      title: formData.get('title') as string || undefined,
      description: formData.get('description') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
      category: formData.get('category') as string || undefined,
      difficulty: formData.get('difficulty') as string || undefined,
      estimatedDuration: formData.get('estimatedDuration') ? parseInt(formData.get('estimatedDuration') as string) : undefined,
      prerequisites: formData.get('prerequisites') ? JSON.parse(formData.get('prerequisites') as string) : undefined,
      tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : undefined,
      orderIndex: formData.get('orderIndex') ? parseInt(formData.get('orderIndex') as string) : undefined,
      isPublished: formData.get('isPublished') === 'true' || undefined,
    };

    const validatedData = UpdateModuleSchema.parse(rawData);
    
    // Check ownership
    const { data: existingModule, error: checkError } = await supabase
      .from('Module')
      .select('id, orgId')
      .eq('id', moduleId)
      .eq('orgId', dbUser.orgId)
      .single();

    if (checkError || !existingModule) {
      throw new Error("Module not found or access denied");
    }

    const now = new Date().toISOString();
    const { id, ...updateData } = validatedData;

    const { data: module, error } = await supabase
      .from('Module')
      .update({
        ...updateData,
        updatedAt: now
      })
      .eq('id', moduleId)
      .eq('orgId', dbUser.orgId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating module: ${error.message}`);
    }

    // Log audit event
    await logAuditEvent(
      'MODULE_UPDATED',
      dbUser.id,
      dbUser.orgId,
      { moduleId, changes: updateData },
      'Module',
      moduleId
    );

    return { success: true, module };
  } catch (error: any) {
    console.error("Error updating module:", error);
    return { error: error.message || "Failed to update module" };
  }
}

export async function deleteModule(moduleId: string) {
  try {
    const { dbUser } = await getCurrentUserWithAuth(['ADMIN']);
    
    // Check ownership and get module info
    const { data: module, error: checkError } = await supabase
      .from('Module')
      .select('id, title, orgId')
      .eq('id', moduleId)
      .eq('orgId', dbUser.orgId)
      .single();

    if (checkError || !module) {
      throw new Error("Module not found or access denied");
    }

    // Delete module (cascading deletes will handle lessons)
    const { error } = await supabase
      .from('Module')
      .delete()
      .eq('id', moduleId)
      .eq('orgId', dbUser.orgId);

    if (error) {
      throw new Error(`Error deleting module: ${error.message}`);
    }

    // Log audit event
    await logAuditEvent(
      'MODULE_DELETED',
      dbUser.id,
      dbUser.orgId,
      { moduleTitle: module.title },
      'Module',
      moduleId
    );

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting module:", error);
    return { error: error.message || "Failed to delete module" };
  }
}

export async function getModules(filters?: any) {
  try {
    const { dbUser } = await getCurrentUserWithAuth();
    
    const validatedFilters = filters ? ModuleFilterSchema.parse(filters) : {};
    
    let query = supabase
      .from('Module')
      .select(`
        id,
        title,
        description,
        imageUrl,
        category,
        difficulty,
        estimatedDuration,
        isPublished,
        prerequisites,
        tags,
        orderIndex,
        createdAt,
        updatedAt,
        lessons(count)
      `)
      .eq('orgId', dbUser.orgId);

    // Apply filters
    if (validatedFilters.category) {
      query = query.eq('category', validatedFilters.category);
    }
    if (validatedFilters.difficulty) {
      query = query.eq('difficulty', validatedFilters.difficulty);
    }
    if (validatedFilters.isPublished !== undefined) {
      query = query.eq('isPublished', validatedFilters.isPublished);
    }
    if (validatedFilters.search) {
      query = query.or(`title.ilike.%${validatedFilters.search}%,description.ilike.%${validatedFilters.search}%`);
    }

    // Apply pagination
    query = query
      .range(validatedFilters.offset || 0, (validatedFilters.offset || 0) + (validatedFilters.limit || 20) - 1)
      .order('orderIndex', { ascending: true, nullsLast: true })
      .order('createdAt', { ascending: false });

    const { data: modules, error } = await query;

    if (error) {
      throw new Error(`Error fetching modules: ${error.message}`);
    }

    return { success: true, modules };
  } catch (error: any) {
    console.error("Error fetching modules:", error);
    return { error: error.message || "Failed to fetch modules" };
  }
}

// ===== LESSON MANAGEMENT =====

export async function createLesson(formData: FormData) {
  try {
    const { dbUser } = await getCurrentUserWithAuth(['ADMIN', 'MANAGER']);
    
    const rawData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || undefined,
      content: formData.get('content') ? JSON.parse(formData.get('content') as string) : undefined,
      contentType: formData.get('contentType') as string,
      duration: formData.get('duration') ? parseInt(formData.get('duration') as string) : undefined,
      isRequired: formData.get('isRequired') !== 'false',
      passingScore: formData.get('passingScore') ? parseInt(formData.get('passingScore') as string) : undefined,
      orderIndex: formData.get('orderIndex') ? parseInt(formData.get('orderIndex') as string) : 0,
      moduleId: formData.get('moduleId') as string,
    };

    const validatedData = CreateLessonSchema.parse(rawData);
    
    // Check module ownership
    const { data: module, error: moduleError } = await supabase
      .from('Module')
      .select('id, orgId')
      .eq('id', validatedData.moduleId)
      .eq('orgId', dbUser.orgId)
      .single();

    if (moduleError || !module) {
      throw new Error("Module not found or access denied");
    }

    const now = new Date().toISOString();

    const { data: lesson, error } = await supabase
      .from('Lesson')
      .insert([{
        id: createId(),
        ...validatedData,
        orgId: dbUser.orgId,
        createdAt: now,
        updatedAt: now
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating lesson: ${error.message}`);
    }

    // Log audit event
    await logAuditEvent(
      'LESSON_CREATED',
      dbUser.id,
      dbUser.orgId,
      { lessonTitle: validatedData.title, moduleId: validatedData.moduleId },
      'Lesson',
      lesson.id
    );

    return { success: true, lesson };
  } catch (error: any) {
    console.error("Error creating lesson:", error);
    return { error: error.message || "Failed to create lesson" };
  }
}

// Progress tracking and other functions would continue here...
// For brevity, I'll add the remaining functions in the next part

// ... existing code ... 