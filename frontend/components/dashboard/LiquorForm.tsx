import React, { useState } from 'react';

type Props = {
  onAdd: () => void;
};

export default function LiquorForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/liquors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, description, imageUrl }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add liquor');
      }
      setName('');
      setType('');
      setDescription('');
      setImageUrl('');
      onAdd();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mt-8 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Custom Liquor</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name *</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Type *</label>
        <input type="text" value={type} onChange={e => setType(e.target.value)} required className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Image URL</label>
        <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>
      <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50">
        {loading ? 'Adding...' : 'Add Liquor'}
      </button>
    </form>
  );
} 