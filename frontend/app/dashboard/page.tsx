'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import LiquorList from '../../components/dashboard/LiquorList';
import LiquorForm from '../../components/dashboard/LiquorForm';

export default function DashboardPage() {
  const [customLiquors, setCustomLiquors] = useState([]);
  const [cocktaildbLiquors, setCocktaildbLiquors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiquors = async () => {
    setLoading(true);
    const res = await fetch('/api/liquors');
    const data = await res.json();
    setCustomLiquors(data.custom || []);
    setCocktaildbLiquors(data.cocktaildb || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLiquors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Welcome to the Restaurant Training Portal Dashboard
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <LiquorForm onAdd={fetchLiquors} />
        {loading ? (
          <div className="text-center mt-8 text-gray-500">Loading liquors...</div>
        ) : (
          <LiquorList customLiquors={customLiquors} cocktaildbLiquors={cocktaildbLiquors} />
        )}
      </div>
    </div>
  )
} 