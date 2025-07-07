'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'cocktails' | 'wines'>('cocktails')

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage cocktails and wines for your restaurant training program.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href={`/admin/${activeTab}/new`}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add {activeTab === 'cocktails' ? 'Cocktail' : 'Wine'}
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('cocktails')}
            className={`${
              activeTab === 'cocktails'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Cocktails
          </button>
          <button
            onClick={() => setActiveTab('wines')}
            className={`${
              activeTab === 'wines'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Wines
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="mt-8">
        {activeTab === 'cocktails' ? (
          <CocktailsList />
        ) : (
          <WinesList />
        )}
      </div>
    </div>
  )
}

function CocktailsList() {
  // Placeholder data - will be replaced with API calls
  const cocktails = [
    {
      id: '1',
      name: 'Classic Margarita',
      baseLiquor: 'Tequila',
      tier: 'MEDIUM',
      description: 'A refreshing and tangy classic cocktail perfect for any occasion.',
    },
    {
      id: '2',
      name: 'Negroni',
      baseLiquor: 'Gin',
      tier: 'HIGH',
      description: 'A sophisticated Italian aperitif with a perfect balance of bitter and sweet.',
    },
  ]

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {cocktails.map((cocktail) => (
          <li key={cocktail.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {cocktail.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {cocktail.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cocktail.baseLiquor} • {cocktail.tier}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/cocktails/${cocktail.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">{cocktail.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WinesList() {
  // Placeholder data - will be replaced with API calls
  const wines = [
    {
      id: '1',
      name: 'Château Margaux 2015',
      grapeVariety: 'Cabernet Sauvignon',
      tier: 'HIGH',
      description: 'A legendary Bordeaux with exceptional complexity and aging potential.',
    },
    {
      id: '2',
      name: 'Dom Pérignon 2012',
      grapeVariety: 'Chardonnay',
      tier: 'HIGH',
      description: 'A prestigious champagne with fine bubbles and elegant complexity.',
    },
  ]

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {wines.map((wine) => (
          <li key={wine.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-medium">
                        {wine.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {wine.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {wine.grapeVariety} • {wine.tier}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/wines/${wine.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">{wine.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 