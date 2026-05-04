'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Calendar, CreditCard, LogOut, FileText } from 'lucide-react';
import { getUserReservations, getCurrentUser } from '@/lib/api';
import { Reservation, User, MOCK_CARS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          const userRes = await getUserReservations(currentUser.id);
          setReservations(userRes);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Loading dashboard...</div>;
  }

  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return <div className="flex-1 flex items-center justify-center">Redirecting to login...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-1">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <img src={user.avatar_url} alt="Profile" className="w-16 h-16 rounded-full border-2 border-indigo-500" />
          <div>
            <h1 className="text-3xl font-bold">{user.full_name}</h1>
            <p className="text-neutral-400">{user.email}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-neutral-400 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b-2 border-indigo-500 pb-2">
        <FileText className="w-6 h-6 text-indigo-400" /> My Reservations
      </h2>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 text-center text-red-400 mb-8">
          <p className="text-xl font-bold">{error}</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
          <Car className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No reservations yet</h3>
          <p className="text-neutral-400">You haven't booked any cars yet. Browse our fleet to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reservations.map((res, idx) => {
            const car = MOCK_CARS.find(c => c.id === res.car_id);
            return (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden shrink-0">
                  <img src={car?.image_url} className="w-full h-full object-cover" alt="Car" />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{car?.brand} {car?.model}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        res.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                        res.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                        'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30'
                      }`}>
                        {res.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{formatPrice(res.total_price)}</span>
                      <p className="text-neutral-500 text-sm">Total paid</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                      <div>
                        <p className="text-xs text-neutral-500">Pick-up</p>
                        <p className="font-medium text-sm">{res.start_date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-xs text-neutral-500">Drop-off</p>
                        <p className="font-medium text-sm">{res.end_date}</p>
                      </div>
                    </div>
                  </div>
                  
                  {res.license_photo_url && (
                    <p className="text-xs text-neutral-500 mt-4 flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> License verified
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
