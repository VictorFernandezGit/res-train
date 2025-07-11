"use client";

import React, { useState } from 'react';
import BackendLayout from '../../components/layout/BackendLayout';

// Sample cocktail data
const sampleCocktails = [
  {
    id: '1',
    name: 'Margarita',
    type: 'COCKTAIL',
    baseLiquor: 'Tequila',
    tier: 'MEDIUM',
    ingredients: ['Tequila', 'Lime juice', 'Triple sec'],
    description: 'A classic Mexican cocktail with a perfect balance of sweet and sour.',
    recipe: '1. Rim glass with salt\n2. Shake tequila, lime juice, and triple sec with ice\n3. Strain into glass',
    imageUrl: 'https://example.com/margarita.jpg'
  },
  {
    id: '2',
    name: 'Old Fashioned',
    type: 'COCKTAIL',
    baseLiquor: 'Bourbon',
    tier: 'HIGH',
    ingredients: ['Bourbon', 'Angostura bitters', 'Sugar cube', 'Orange peel'],
    description: 'A sophisticated cocktail that showcases the whiskey.',
    recipe: '1. Muddle sugar cube with bitters\n2. Add bourbon and ice\n3. Garnish with orange peel',
    imageUrl: 'https://example.com/old-fashioned.jpg'
  },
  {
    id: '3',
    name: 'Mojito',
    type: 'COCKTAIL',
    baseLiquor: 'Rum',
    tier: 'LOW',
    ingredients: ['White rum', 'Lime juice', 'Mint leaves', 'Simple syrup', 'Soda water'],
    description: 'A refreshing Cuban cocktail perfect for hot days.',
    recipe: '1. Muddle mint with lime juice and syrup\n2. Add rum and ice\n3. Top with soda water',
    imageUrl: 'https://example.com/mojito.jpg'
  }
];

export default function CocktailsPage() {
  const [cocktails, setCocktails] = useState(sampleCocktails);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'COCKTAIL',
    baseLiquor: '',
    tier: 'MEDIUM',
    ingredients: '',
    description: '',
    recipe: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCocktail = {
      id: Date.now().toString(),
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim())
    };
    setCocktails([...cocktails, newCocktail]);
    setFormData({
      name: '',
      type: 'COCKTAIL',
      baseLiquor: '',
      tier: 'MEDIUM',
      ingredients: '',
      description: '',
      recipe: '',
      imageUrl: ''
    });
    setShowForm(false);
  };

  return (
    <BackendLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Cocktails
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create and manage your custom cocktail recipes
          </p>
        </div>

        {/* Add Cocktail Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add New Cocktail'}
          </button>
        </div>

        {/* Add Cocktail Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Add New Cocktail</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="COCKTAIL">Cocktail</option>
                  <option value="WINE">Wine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Liquor *</label>
                <input
                  type="text"
                  value={formData.baseLiquor}
                  onChange={(e) => setFormData({...formData, baseLiquor: e.target.value})}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma-separated) *</label>
              <input
                type="text"
                value={formData.ingredients}
                onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                required
                placeholder="e.g., Tequila, Lime juice, Triple sec"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe *</label>
              <textarea
                value={formData.recipe}
                onChange={(e) => setFormData({...formData, recipe: e.target.value})}
                required
                rows={4}
                placeholder="Step-by-step instructions..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Add Cocktail
              </button>
            </div>
          </form>
        )}

        {/* Cocktails List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((cocktail) => (
            <div key={cocktail.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {cocktail.imageUrl && (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={cocktail.imageUrl}
                    alt={cocktail.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{cocktail.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    cocktail.tier === 'HIGH' ? 'bg-red-100 text-red-800' :
                    cocktail.tier === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {cocktail.tier}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{cocktail.baseLiquor}</p>
                <p className="text-gray-700 mb-3">{cocktail.description}</p>
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {cocktail.ingredients.map((ingredient, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                <details className="text-sm">
                  <summary className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium">
                    View Recipe
                  </summary>
                  <div className="mt-2 text-gray-700 whitespace-pre-line">
                    {cocktail.recipe}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackendLayout>
  );
} 