"use client";

// TODO: Switch to useActionState when upgrading to React 19/Next.js 15.4+
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAdmin, AdminSignupState } from "@/app/actions/registerAdmin";
import { createClient } from "@/lib/supabase";

export default function AdminSignupForm() {
  const router = useRouter();
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const [state, formAction] = useFormState<AdminSignupState, FormData>(registerAdmin, { error: null });

  useEffect(() => {
    if (state?.success) {
      // Try to get the form data from the last submission to auto-login
      const handleAutoLogin = async () => {
        try {
          // Get the email and password from the form (if available)
          const formElements = document.querySelector('form') as HTMLFormElement;
          if (formElements) {
            const formData = new FormData(formElements);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            
            if (email && password) {
              const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              
              if (!error) {
                router.push("/admin/dashboard");
                return;
              }
            }
          }
        } catch (error) {
          console.warn("Auto-login failed:", error);
        }
        
        // If auto-login fails, redirect to login page
        router.push("/login?message=Registration successful. Please sign in.");
      };
      
      handleAutoLogin();
    }
  }, [state, router, supabase]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Create Admin Account
        </h2>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {state.error}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@restaurant.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Acme Restaurant"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Admin Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}