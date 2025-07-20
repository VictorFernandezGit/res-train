import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Admin Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900">Staff Management</h3>
                <p className="text-blue-700 mt-2">Manage your restaurant staff and their training progress</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900">Training Content</h3>
                <p className="text-green-700 mt-2">Create and manage training modules and quizzes</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900">Analytics</h3>
                <p className="text-purple-700 mt-2">View training progress and performance metrics</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add New Staff Member
                </button>
                <button className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ml-0 md:ml-2">
                  Create Training Module
                </button>
                <button className="w-full md:w-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 ml-0 md:ml-2">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 