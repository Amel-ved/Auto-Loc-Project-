'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Car } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 text-center relative z-10 flex flex-col items-center mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>The future of car rental is here</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
        >
          Drive your dreams, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            without the hassle.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12"
        >
          Premium vehicles, seamless booking, and unmatched service. 
          Experience the finest fleet with our next-generation rental platform.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/cars" 
            className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse Fleet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="max-w-6xl w-full mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
          <p className="text-neutral-400">Choose your car, pick your dates, and get instantly confirmed. No waiting around.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure Verification</h3>
          <p className="text-neutral-400">Quickly upload your driver's license using our secure encrypted upload portal.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 text-pink-400">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Premium Fleet</h3>
          <p className="text-neutral-400">From luxury sedans to powerful SUVs, our fleet is meticulously maintained.</p>
        </div>
      </motion.div>
    </div>
  );
}
