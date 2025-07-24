import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminDashboard from "@/components/dashboard/AdminDashboard"
import StaffDashboard from "@/components/dashboard/StaffDashboard"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  
  console.log('🔧 Dashboard access attempt:', {
    hasUser: !!user,
    userEmail: user?.email,
    userRole: user?.user_metadata?.role,
    authError: error?.message,
    timestamp: new Date().toISOString()
  });
  
  if (error) {
    console.error('❌ Auth error in dashboard:', error);
    redirect("/login")
  }
  
  if (!user) {
    console.log('❌ No user found, redirecting to login');
    redirect("/login")
  }

  // Get user details
  const userRole = user.user_metadata?.role
  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User'
  const orgName = user.user_metadata?.org_name || 'Your Restaurant'

  console.log('🔧 User details extracted:', {
    userRole,
    userName, 
    orgName,
    orgId: user.user_metadata?.org_id
  });

  // Route based on user role
  if (userRole === "ADMIN") {
    console.log('✅ Routing to Admin Dashboard');
    return <AdminDashboard adminName={userName} orgName={orgName} />
  } else {
    console.log('✅ Routing to Staff Dashboard for role:', userRole || 'undefined');
    // Staff, Manager, or any other role goes to staff dashboard
    return <StaffDashboard staffName={userName} orgName={orgName} />
  }
} 