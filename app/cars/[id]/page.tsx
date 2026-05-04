'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getCarById, createReservation } from '@/lib/api';
import { Car as CarType } from '@/lib/mock-data';
import { Calendar, CreditCard, ShieldCheck, CheckCircle2, UploadCloud, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  
  // Reservation state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadCar() {
      try {
        const data = await getCarById(params.id);
        setCar(data || null);
      } catch (err: any) {
        setPageError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCar();
  }, [params.id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car || !startDate || !endDate || !file) return;
    
    setIsSubmitting(true);
    setPageError(null);
    const res = await createReservation(car.id, startDate, endDate, file);
    setIsSubmitting(false);
    
    if (res.success) {
      setSuccess(true);
    } else {
      setPageError(res.error || 'Server down, try again later please!');
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading details...</div>;
  if (pageError && !car) return <div className="flex-1 flex items-center justify-center text-red-400 font-bold text-xl">{pageError}</div>;
  if (!car) return <div className="flex-1 flex items-center justify-center">Car not found.</div>;

  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Reservation Confirmed!</h2>
          <p className="text-neutral-400 mb-8">
            Your {car.brand} {car.model} is successfully booked from {startDate} to {endDate}. 
            Your driver's license has been securely uploaded to our Storage.
          </p>
          <Link href="/dashboard" className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-neutral-200 transition-colors">
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 w-full">
      <Link href="/cars" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Fleet
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Car Details */}
        <div>
          <div className="rounded-3xl overflow-hidden h-80 md:h-[400px] mb-8 relative border border-white/10">
            <img src={car.image_url} alt={car.model} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full font-medium">
              {car.category}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">{car.brand} {car.model}</h1>
          <p className="text-xl text-neutral-400 mb-6">{car.year} • Automatic</p>

          <div className="flex items-center gap-4 text-2xl font-bold text-indigo-400 mb-8 pb-8 border-b border-white/10">
            {formatPrice(car.price_per_day)} <span className="text-base text-neutral-500 font-normal">/ day</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-green-400" /></div>
              <div><p className="font-medium">Full Insurance Included</p><p className="text-sm text-neutral-500">Zero deductible</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Calendar className="w-5 h-5 text-indigo-400" /></div>
              <div><p className="font-medium">Free Cancellation</p><p className="text-sm text-neutral-500">Up to 24h before pick-up</p></div>
            </div>
          </div>
        </div>

        {/* Booking Form (Table C Creation) */}
        <div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Book this vehicle</h3>
            
            {pageError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                {pageError}
              </div>
            )}
            
            <form onSubmit={handleBook} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Pick-up Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Drop-off Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Driver's License (Required)</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/*,.pdf"
                    required
                  />
                  {file ? (
                    <div className="flex flex-col items-center text-green-400">
                      <CheckCircle2 className="w-8 h-8 mb-2" />
                      <span className="font-medium text-sm">{file.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-neutral-400">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="font-medium text-sm">Click to upload license scan</span>
                      <span className="text-xs mt-1">JPEG, PNG or PDF</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  type="submit"
                  disabled={isSubmitting || !startDate || !endDate || !file}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" /> Confirm Reservation
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-neutral-500 mt-4">
                  By clicking confirm, your data will be securely stored in our Supabase backend.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
