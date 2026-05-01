'use client';

import Link from 'next/link';
import { Car, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '@/lib/api';
import { User } from '@/lib/mock-data';

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check auth status on mount
    async function checkAuth() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    checkAuth();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Auto<span className="text-indigo-500">Loc</span></span>
        </Link>
        
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/cars" className="text-neutral-400 hover:text-white transition-colors">
            Fleet
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button onClick={() => logout()} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all text-red-400 hover:text-red-300">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link href="/login" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all text-white">
              <UserCircle className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
