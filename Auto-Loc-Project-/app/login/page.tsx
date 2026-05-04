'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { login, signUp, HAS_SUPABASE_KEYS } from '@/lib/api';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const res = await login(email, password);
      if (res.success) {
        window.location.href = '/dashboard';
      } else {
        setError(res.error || 'Authentication failed');
        setLoading(false);
      }
    } else {
      const res = await signUp(email, password, fullName);
      if (res.success) {
        if (res.needsEmailConfirmation) {
          setError('Account created. Please confirm your email before logging in.');
          setIsLogin(true);
          setLoading(false);
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        setError(res.error || 'Signup failed');
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Car className="w-7 h-7 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-neutral-400 text-center mb-8">
          {isLogin ? 'Sign in to manage your rentals' : 'Join AutoLoc and start exploring'}
        </p>

        {!HAS_SUPABASE_KEYS && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-200 text-sm">
            <p>
              Supabase is not configured yet. Create <code className="bg-black/20 px-1 rounded">.env.local</code> from <code className="bg-black/20 px-1 rounded">.env.example</code>, add your Supabase URL and anon key, then set <code className="bg-black/20 px-1 rounded">NEXT_PUBLIC_USE_MOCK_DATA=false</code>.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="email" 
                placeholder="admin@admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="password" 
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 mt-6 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')} 
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
