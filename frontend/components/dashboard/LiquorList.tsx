import React from 'react';

type Liquor = {
  id?: string;
  name: string;
  type?: string;
  description?: string;
  imageUrl?: string;
  source?: string;
};

type Props = {
  customLiquors: Liquor[];
  cocktaildbLiquors: Liquor[];
};

export default function LiquorList({ customLiquors, cocktaildbLiquors }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Custom Liquors</h2>
      <ul className="mb-6">
        {customLiquors.length === 0 && <li className="text-gray-500">No custom liquors yet.</li>}
        {customLiquors.map((liq) => (
          <li key={liq.id} className="border-b py-2">
            <span className="font-bold">{liq.name}</span> {liq.type && <span className="text-gray-500">({liq.type})</span>}
            {liq.description && <div className="text-sm text-gray-600">{liq.description}</div>}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Liquors from TheCocktailDB</h2>
      <ul>
        {cocktaildbLiquors.length === 0 && <li className="text-gray-500">No liquors found from TheCocktailDB.</li>}
        {cocktaildbLiquors.map((liq) => (
          <li key={liq.name} className="border-b py-2">
            <span className="font-bold">{liq.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 