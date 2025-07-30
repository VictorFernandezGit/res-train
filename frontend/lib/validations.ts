import { z } from "zod"

// Existing validation schemas
export const AdminSignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  orgName: z.string().min(2, "Organization name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const StaffMemberSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["STAFF", "MANAGER"]),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// New LMS validation schemas

// Module validation
export const CreateModuleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  category: z.enum(["WINE", "SPIRITS", "COCKTAILS", "SERVICE", "COMPLIANCE", "GENERAL", "FOOD_PAIRING", "CUSTOMER_SERVICE"]),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  estimatedDuration: z.number().min(1, "Duration must be at least 1 minute").max(480, "Duration too long").optional(),
  prerequisites: z.array(z.string().cuid("Invalid prerequisite ID")).max(10, "Too many prerequisites").optional(),
  tags: z.array(z.string().min(1).max(50)).max(20, "Too many tags").optional(),
  orderIndex: z.number().min(0).optional(),
})

export const UpdateModuleSchema = CreateModuleSchema.partial().extend({
  id: z.string().cuid("Invalid module ID"),
  isPublished: z.boolean().optional(),
})

// Lesson validation
export const CreateLessonSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  content: z.any().optional(), // JSON content will be validated separately
  contentType: z.enum(["TEXT", "VIDEO", "INTERACTIVE", "QUIZ", "DOCUMENT", "AUDIO", "PRESENTATION"]),
  duration: z.number().min(1, "Duration must be at least 1 minute").max(480, "Duration too long").optional(),
  isRequired: z.boolean().default(true),
  passingScore: z.number().min(0).max(100, "Score must be between 0-100").optional(),
  orderIndex: z.number().min(0).default(0),
  moduleId: z.string().cuid("Invalid module ID"),
})

export const UpdateLessonSchema = CreateLessonSchema.partial().extend({
  id: z.string().cuid("Invalid lesson ID"),
  isPublished: z.boolean().optional(),
})

// Progress validation
export const UpdateProgressSchema = z.object({
  lessonId: z.string().cuid("Invalid lesson ID").optional(),
  moduleId: z.string().cuid("Invalid module ID").optional(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "FAILED", "LOCKED"]).optional(),
  score: z.number().min(0).max(100, "Score must be between 0-100").optional(),
  timeSpent: z.number().min(0, "Time spent cannot be negative").optional(),
  notes: z.string().max(1000, "Notes too long").optional(),
})

// Media upload validation
export const MediaUploadSchema = z.object({
  filename: z.string().min(1, "Filename required"),
  originalName: z.string().min(1, "Original name required"),
  mimeType: z.string().regex(/^[a-zA-Z]+\/[a-zA-Z0-9\-\+\.]+$/, "Invalid MIME type"),
  size: z.number().min(1, "File size required").max(50 * 1024 * 1024, "File too large (max 50MB)"),
  url: z.string().url("Invalid file URL"),
  description: z.string().max(500, "Description too long").optional(),
  lessonId: z.string().cuid("Invalid lesson ID").optional(),
})

// Content validation for rich text/JSON content
export const ContentSchema = z.object({
  text: z.string().optional(),
  html: z.string().optional(),
  blocks: z.array(z.any()).optional(), // For block-based editors
  metadata: z.record(z.string(), z.any()).optional(),
}).refine(
  (data) => data.text || data.html || data.blocks,
  { message: "Content must have text, html, or blocks" }
)

// Audit log validation
export const AuditLogSchema = z.object({
  action: z.string().min(1, "Action is required").max(100, "Action name too long"),
  details: z.record(z.string(), z.any()).optional(),
  tableName: z.string().max(50, "Table name too long").optional(),
  recordId: z.string().cuid("Invalid record ID").optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().max(500, "User agent too long").optional(),
})

// Bulk operation schemas
export const BulkModuleOperationSchema = z.object({
  moduleIds: z.array(z.string().cuid("Invalid module ID")).min(1, "At least one module required").max(50, "Too many modules"),
  operation: z.enum(["publish", "unpublish", "delete", "duplicate"]),
})

export const BulkLessonOperationSchema = z.object({
  lessonIds: z.array(z.string().cuid("Invalid lesson ID")).min(1, "At least one lesson required").max(100, "Too many lessons"),
  operation: z.enum(["publish", "unpublish", "delete", "reorder"]),
  moduleId: z.string().cuid("Invalid module ID").optional(), // For moving lessons
})

// Search and filter schemas
export const ModuleFilterSchema = z.object({
  category: z.enum(["WINE", "SPIRITS", "COCKTAILS", "SERVICE", "COMPLIANCE", "GENERAL", "FOOD_PAIRING", "CUSTOMER_SERVICE"]).optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  isPublished: z.boolean().optional(),
  search: z.string().max(100, "Search term too long").optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
})

export const LessonFilterSchema = z.object({
  moduleId: z.string().cuid("Invalid module ID").optional(),
  contentType: z.enum(["TEXT", "VIDEO", "INTERACTIVE", "QUIZ", "DOCUMENT", "AUDIO", "PRESENTATION"]).optional(),
  isPublished: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  search: z.string().max(100, "Search term too long").optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
})

// Type exports for TypeScript
export type AdminSignupData = z.infer<typeof AdminSignupSchema>
export type StaffMemberData = z.infer<typeof StaffMemberSchema>
export type CreateModuleData = z.infer<typeof CreateModuleSchema>
export type UpdateModuleData = z.infer<typeof UpdateModuleSchema>
export type CreateLessonData = z.infer<typeof CreateLessonSchema>
export type UpdateLessonData = z.infer<typeof UpdateLessonSchema>
export type UpdateProgressData = z.infer<typeof UpdateProgressSchema>
export type MediaUploadData = z.infer<typeof MediaUploadSchema>
export type ContentData = z.infer<typeof ContentSchema>
export type AuditLogData = z.infer<typeof AuditLogSchema>
export type BulkModuleOperationData = z.infer<typeof BulkModuleOperationSchema>
export type BulkLessonOperationData = z.infer<typeof BulkLessonOperationSchema>
export type ModuleFilterData = z.infer<typeof ModuleFilterSchema>
export type LessonFilterData = z.infer<typeof LessonFilterSchema> 