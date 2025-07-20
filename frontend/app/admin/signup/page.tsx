import AdminSignupForm from "@/components/auth/AdminSignupForm"

export default function AdminSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurant Training Platform
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Set up your restaurant's training system
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AdminSignupForm />
      </div>
    </div>
  )
} 