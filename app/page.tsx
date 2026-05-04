'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Car, Clock, MapPin, Star, Smartphone, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center text-center">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>AutoLoc is now available in Algiers & Oran</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 max-w-4xl"
        >
          Drive your dreams, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            without the hassle.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12"
        >
          Skip the counter, the paperwork, and the waiting. AutoLoc provides on-demand premium vehicles delivered directly to you with bank-level identity verification.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/cars" 
            className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse Cars <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors hover:bg-white/10"
          >
            Create an Account
          </Link>
        </motion.div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="text-4xl font-bold text-white mb-2">50+</h4>
            <p className="text-neutral-500 font-medium">Premium Vehicles</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-white mb-2">12k</h4>
            <p className="text-neutral-500 font-medium">Active Users</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
            <p className="text-neutral-500 font-medium">Digital Process</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-white mb-2">24/7</h4>
            <p className="text-neutral-500 font-medium">Customer Support</p>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why choose AutoLoc?</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">We've entirely re-engineered the car rental experience to be seamless, digital, and instantly accessible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Instant Booking", desc: "No manual approvals. AI-driven verification gets you approved and confirmed in seconds.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
            { icon: ShieldCheck, title: "Secure Identity", desc: "End-to-end encrypted storage for your driver's license powered by Supabase Cloud.", color: "text-green-400", bg: "bg-green-400/10" },
            { icon: MapPin, title: "Anywhere Delivery", desc: "Select your vehicle and we drop it off at your location. Airport, hotel, or home.", color: "text-blue-400", bg: "bg-blue-400/10" },
            { icon: Clock, title: "Flexible Times", desc: "Need the car for an extra day? Extend your reservation instantly from the dashboard.", color: "text-purple-400", bg: "bg-purple-400/10" },
            { icon: Car, title: "Immaculate Fleet", desc: "Every car is detailed, inspected, and fueled up before every single handover.", color: "text-pink-400", bg: "bg-pink-400/10" },
            { icon: Smartphone, title: "Digital Keys", desc: "Unlock and start your rented vehicle directly from your smartphone via the Extranet.", color: "text-indigo-400", bg: "bg-indigo-400/10" }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
              }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Four steps to the open road.</h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Create an account", desc: "Register securely on our Extranet portal." },
                { step: "02", title: "Select your vehicle", desc: "Browse our premium cars and pick your dates." },
                { step: "03", title: "Upload your ID", desc: "Securely upload your driver's license for instant automated verification." },
                { step: "04", title: "Hit the road", desc: "Pick up your car or have it delivered. Your dashboard tracks everything." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-2xl font-bold text-indigo-500/50">{item.step}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Car Dashboard" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
                <div>
                  <p className="font-bold text-lg text-white">License Verified</p>
                  <p className="text-sm text-green-300">Ready for pickup at 09:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-neutral-950 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Auto<span className="text-indigo-500">Loc</span></span>
            </Link>
            <p className="text-neutral-500 max-w-sm">The modern cloud-based extranet for premium car rentals. Build & Ship - Architecture Cloud 2026.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Product</h5>
            <ul className="space-y-2 text-neutral-500">
                <li><Link href="/cars" className="hover:text-white transition-colors">Available Cars</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Locations</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Legal</h5>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Insurance Details</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-center text-neutral-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AutoLoc Inc. All rights reserved.</p>
          <p>Powered by Next.js, Vercel & Supabase.</p>
        </div>
      </footer>

    </div>
  );
}
