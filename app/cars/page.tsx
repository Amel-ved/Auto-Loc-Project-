'use client';

import { useEffect, useState } from 'react';
import { getCars } from '@/lib/api';
import { Car as CarType } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Settings, Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function CarsPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 inline-block border-b-2 border-indigo-500 pb-2">Our Premium Fleet</h1>
        <p className="text-neutral-400 text-lg">Choose the perfect vehicle for your next adventure.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white/5 rounded-2xl h-96 border border-white/5" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 text-center text-red-400">
          <p className="text-xl font-bold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/10 transition-colors flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={car.image_url} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                  {car.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-1">{car.brand}</h3>
                <h4 className="text-neutral-400 mb-6">{car.model}</h4>
                
                <div className="flex items-center gap-4 text-sm text-neutral-300 mb-8">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
                    <Settings className="w-4 h-4" />
                    <span>Auto</span>
                  </div>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">{formatPrice(car.price_per_day)}</span>
                    <span className="text-neutral-500 text-sm">/day</span>
                  </div>
                  
                  <Link 
                    href={`/cars/${car.id}`}
                    className="bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-neutral-200 transition-colors"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
