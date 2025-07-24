import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminDashboard from "@/components/dashboard/AdminDashboard"

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect("/login")
  }

  // Check if user is admin
  const userRole = user.user_metadata?.role
  if (userRole !== "ADMIN") {
    redirect("/dashboard")
  }

  // Get admin user details
  const adminName = user.user_metadata?.name || user.email?.split('@')[0] || 'Admin'
  const orgName = user.user_metadata?.org_name || 'Your Restaurant'

  return <AdminDashboard adminName={adminName} orgName={orgName} />
} 