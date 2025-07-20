# Admin Signup Flow Setup

## Overview
This implements a complete admin signup flow for a multi-tenant restaurant training SaaS using Next.js App Router, Supabase Auth, and Prisma.

## Features Implemented

### ✅ Server Action (`registerAdmin`)
- **Location**: `frontend/lib/actions.ts`
- **Functionality**: 
  - Validates form data using Zod
  - Creates new Organization in Prisma
  - Creates user in Supabase Auth with metadata
  - Links user to organization
  - Handles errors and cleanup

### ✅ Form Validation
- **Location**: `frontend/lib/validations.ts`
- **Uses**: Zod for type-safe validation
- **Validates**: name, email, password, orgName

### ✅ UI Components
- **Admin Signup Form**: `frontend/components/auth/AdminSignupForm.tsx`
- **Admin Signup Page**: `frontend/app/admin/signup/page.tsx`
- **Admin Dashboard**: `frontend/app/admin/dashboard/page.tsx`

### ✅ Authentication Flow
- **Supabase Server Client**: `frontend/lib/supabase/server.ts`
- **Role-based Access**: Checks for ADMIN role in user metadata
- **Protected Routes**: Redirects non-admin users

## Required Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Service Role Key (for server actions)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database URL (for Prisma)
DATABASE_URL=your_database_url
```

## Flow Overview

1. **User visits** `/admin/signup`
2. **Fills out form** with name, email, password, restaurant name
3. **Server Action**:
   - Validates data with Zod
   - Creates Organization in Prisma
   - Creates user in Supabase Auth with metadata
   - Creates user record in Prisma linked to org
   - Redirects to `/admin/dashboard`
4. **Dashboard** checks authentication and admin role
5. **Success**: User sees admin dashboard

## Error Handling

- **Validation Errors**: Displayed in form
- **Auth Errors**: Cleaned up (org deleted if auth fails)
- **Database Errors**: Proper error messages returned
- **Network Errors**: Generic error message

## Security Features

- **Role-based Access**: Only ADMIN users can access dashboard
- **Metadata Storage**: User role and org_id stored in Supabase
- **Cleanup**: Failed operations are rolled back
- **Validation**: Server-side validation with Zod

## Usage

1. Navigate to `/admin/signup`
2. Fill out the form
3. Submit to create admin account
4. Get redirected to admin dashboard

## Dependencies Added

- `zod`: Form validation
- `@supabase/ssr`: Server-side Supabase client 