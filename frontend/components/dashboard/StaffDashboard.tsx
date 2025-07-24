"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { 
  BookOpen, 
  Award, 
  Clock,
  TrendingUp,
  User,
  LogOut,
  Play,
  CheckCircle,
  BarChart3
} from "lucide-react";

interface StaffDashboardProps {
  staffName: string;
  orgName: string;
}

export default function StaffDashboard({ staffName, orgName }: StaffDashboardProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Mock data - in real app, this would come from API calls
  const stats = {
    completedModules: 8,
    totalModules: 12,
    completionRate: 67,
    certificationsEarned: 3
  };

  const trainingModules = [
    { id: 1, title: "Wine Service Fundamentals", progress: 100, status: "completed", lessons: 8 },
    { id: 2, title: "Cocktail Preparation", progress: 75, status: "in-progress", lessons: 12 },
    { id: 3, title: "Customer Service Excellence", progress: 100, status: "completed", lessons: 6 },
    { id: 4, title: "Food Safety & Hygiene", progress: 0, status: "not-started", lessons: 10 }
  ];

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Play className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-gray-900">{orgName}</div>
                  <div className="text-xs text-gray-500">Training Portal</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{staffName}</div>
                  <div className="text-xs text-gray-500">Staff Member</div>
                </div>
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {staffName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {staffName}!</h1>
          <p className="text-gray-600 mt-2">Continue your training journey and track your progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Completed Modules" value={stats.completedModules} icon={BookOpen} color="bg-green-500" />
          <StatCard title="Total Modules" value={stats.totalModules} icon={Award} color="bg-blue-500" />
          <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon={TrendingUp} color="bg-purple-500" />
          <StatCard title="Certifications" value={stats.certificationsEarned} icon={Award} color="bg-orange-500" />
        </div>

        {/* Training Modules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Training Modules</h2>
            <div className="text-sm text-gray-500">
              {stats.completedModules} of {stats.totalModules} completed
            </div>
          </div>

          <div className="space-y-4">
            {trainingModules.map((module) => (
              <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(module.status)}`}>
                      {getStatusIcon(module.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{module.progress}%</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(module.status)}`}>
                      {module.status.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full ${
                      module.status === "completed" ? "bg-green-600" : 
                      module.status === "in-progress" ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>

                <div className="flex space-x-2">
                  {module.status === "not-started" ? (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                      Start Module
                    </button>
                  ) : module.status === "in-progress" ? (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                      Continue
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700">
                      Review
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Award className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Wine Service Certification</p>
                <p className="text-xs text-gray-600">Completed 2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Customer Service Excellence</p>
                <p className="text-xs text-gray-600">Completed 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 