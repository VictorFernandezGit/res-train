"use client"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Restaurant Training Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Streamline your restaurant staff training with our comprehensive platform
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="space-y-4">
            <Link
              href="/admin/signup"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              Get Started - Create Admin Account
            </Link>
            
            <Link
              href="/login"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900">Staff Management</h3>
              <p>Manage your restaurant team and track their progress</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Training Modules</h3>
              <p>Create custom training content for your staff</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Progress Tracking</h3>
              <p>Monitor completion rates and performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 