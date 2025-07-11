"use client";
import Link from 'next/link';
import React from 'react';
import BackendLayout from '../../components/layout/BackendLayout';

const metrics = [
  {
    label: 'Total Cocktails',
    value: 42,
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 3H3l7.5 9.5M12 21v-4m0 0l-3-4m3 4l3-4" />
      </svg>
    ),
    color: 'bg-purple-50',
  },
  {
    label: 'Total Wines',
    value: 18,
    icon: (
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4m0-4a4 4 0 004-4V5a2 2 0 00-2-2H10a2 2 0 00-2 2v8a4 4 0 004 4z" />
      </svg>
    ),
    color: 'bg-red-50',
  },
  {
    label: 'Total Users',
    value: 7,
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'bg-indigo-50',
  },
  {
    label: 'Total Liquors',
    value: 12,
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V3m0 0a2 2 0 10-4 0v4m4 0a2 2 0 11-4 0m4 0V3m-4 4v4a2 2 0 002 2h4a2 2 0 002-2V7m-8 0V3m0 4a2 2 0 104 0" />
      </svg>
    ),
    color: 'bg-yellow-50',
  },
];

export default function DashboardPage() {
  return (
    <BackendLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-2">
            Dashboard
          </h1>
          <p className="max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
            Welcome to the Restaurant Training Portal Dashboard
          </p>
        </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className={`rounded-2xl p-6 shadow bg-white flex flex-col items-center ${metric.color}`}>
              <div className="mb-4">{metric.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-lg font-medium text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </BackendLayout>
  );
} 