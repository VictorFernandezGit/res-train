'use client'

import { useState } from 'react'

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState<'cocktails' | 'wines'>('cocktails')

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Staff Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            View cocktails and wines for training and reference.
          </p>
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
          <CocktailsView />
        ) : (
          <WinesView />
        )}
      </div>
    </div>
  )
}

function CocktailsView() {
  // Placeholder data - will be replaced with API calls
  const cocktails = [
    {
      id: '1',
      name: 'Classic Margarita',
      baseLiquor: 'Tequila',
      tier: 'MEDIUM',
      description: 'A refreshing and tangy classic cocktail perfect for any occasion.',
      ingredients: ['2 oz Tequila Blanco', '1 oz Fresh Lime Juice', '0.75 oz Triple Sec', 'Lime wedge for garnish'],
      recipe: '1. Fill a cocktail shaker with ice\n2. Add tequila, lime juice, and triple sec\n3. Shake vigorously for 10-15 seconds\n4. Strain into a salt-rimmed glass\n5. Garnish with lime wedge',
    },
    {
      id: '2',
      name: 'Negroni',
      baseLiquor: 'Gin',
      tier: 'HIGH',
      description: 'A sophisticated Italian aperitif with a perfect balance of bitter and sweet.',
      ingredients: ['1 oz Gin', '1 oz Campari', '1 oz Sweet Vermouth', 'Orange peel for garnish'],
      recipe: '1. Fill a rocks glass with ice\n2. Add gin, Campari, and vermouth\n3. Stir gently for 20-30 seconds\n4. Garnish with orange peel',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cocktails.map((cocktail) => (
        <div key={cocktail.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{cocktail.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                cocktail.tier === 'HIGH' ? 'bg-red-100 text-red-800' :
                cocktail.tier === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {cocktail.tier}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{cocktail.description}</p>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Base Liquor</h4>
              <p className="text-sm text-gray-600">{cocktail.baseLiquor}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Ingredients</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recipe</h4>
              <div className="text-sm text-gray-600 whitespace-pre-line">{cocktail.recipe}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function WinesView() {
  // Placeholder data - will be replaced with API calls
  const wines = [
    {
      id: '1',
      name: 'Château Margaux 2015',
      grapeVariety: 'Cabernet Sauvignon',
      tier: 'HIGH',
      description: 'A legendary Bordeaux with exceptional complexity and aging potential.',
      ingredients: ['Cabernet Sauvignon', 'Merlot', 'Cabernet Franc', 'Petit Verdot'],
      recipe: 'Decant for 2-3 hours before serving. Best served at 60-65°F (16-18°C).',
    },
    {
      id: '2',
      name: 'Dom Pérignon 2012',
      grapeVariety: 'Chardonnay',
      tier: 'HIGH',
      description: 'A prestigious champagne with fine bubbles and elegant complexity.',
      ingredients: ['Chardonnay', 'Pinot Noir'],
      recipe: 'Serve chilled at 45-50°F (7-10°C). Perfect for celebrations and special occasions.',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {wines.map((wine) => (
        <div key={wine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{wine.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                wine.tier === 'HIGH' ? 'bg-red-100 text-red-800' :
                wine.tier === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {wine.tier}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{wine.description}</p>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Grape Variety</h4>
              <p className="text-sm text-gray-600">{wine.grapeVariety}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Blend</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {wine.ingredients.map((grape, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                    {grape}
                  </li>
                ))}
              </ul>
            </div>
            {wine.recipe && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Serving Notes</h4>
                <div className="text-sm text-gray-600">{wine.recipe}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 