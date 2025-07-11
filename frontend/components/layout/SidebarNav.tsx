import React, { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏡' },
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/cocktails', label: 'Cocktails', icon: '🍸' },
  { href: '/liquors', label: 'Liquors', icon: '🥃' },
  { href: '/wines', label: 'Wines', icon: '🍷' },
  { href: '/users', label: 'Users', icon: '👤' },
];

export default function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`h-screen bg-white border-r shadow-sm flex flex-col transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Collapse Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className={`font-bold text-xl text-indigo-600 transition-all duration-200 ${collapsed ? 'hidden' : 'block'}`}>ResTrain</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </button>
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className={`flex items-center px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors ${collapsed ? 'justify-center' : ''}`}>
                <span className="text-xl mr-3">{link.icon}</span>
                <span className={`text-gray-800 font-medium transition-all duration-200 ${collapsed ? 'hidden' : 'block'}`}>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Profile/Logout */}
      <div className="mt-auto px-4 py-4 border-t flex items-center gap-3">
        <div className={`flex items-center gap-2 ${collapsed ? 'hidden' : 'block'}`}>
          <span className="inline-block w-8 h-8 bg-indigo-200 rounded-full text-indigo-700 flex items-center justify-center font-bold">A</span>
          <span className="font-medium text-gray-700">Admin</span>
        </div>
        <button className="ml-auto text-gray-500 hover:text-red-600" title="Logout">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
} 