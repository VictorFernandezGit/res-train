"use client";

// TODO: Switch to useActionState when upgrading to React 19/Next.js 15.4+
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { useFormState } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { registerAdmin, AdminSignupState } from "@/app/actions/registerAdmin";
import { createClient } from "@/lib/supabase";

export default function AdminSignupForm() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const [state, formAction] = useFormState<AdminSignupState, FormData>(registerAdmin, { error: null });

  useEffect(() => {
    if (state?.success) {
      console.log("Registration successful, attempting auto-login...");
      setIsLoggingIn(true);
      
      // Try to get the form data from the last submission to auto-login
      const handleAutoLogin = async () => {
        try {
          // Get the email and password from the form
          if (formRef.current) {
            const formData = new FormData(formRef.current);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            
            console.log("Attempting to sign in with email:", email);
            
            if (email && password) {
              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              
              console.log("Sign in result:", { data: !!data.user, error });
              
              if (!error && data.user) {
                console.log("Auto-login successful, redirecting to admin dashboard...");
                router.push("/admin/dashboard");
                router.refresh(); // Force a refresh to update auth state
                return;
              } else {
                console.error("Auto-login failed:", error);
              }
            } else {
              console.error("Email or password not found in form");
            }
          } else {
            console.error("Form reference not found");
          }
        } catch (error) {
          console.error("Auto-login error:", error);
        }
        
        setIsLoggingIn(false);
        // If auto-login fails, redirect to login page
        console.log("Redirecting to login page...");
        router.push("/login?message=Registration successful. Please sign in.");
      };
      
      // Add a small delay to ensure form data is available
      setTimeout(handleAutoLogin, 100);
    }
  }, [state, router, supabase]);

  if (isLoggingIn) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Signing you in...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Create Admin Account
        </h2>
        <form ref={formRef} action={formAction} className="space-y-4">
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