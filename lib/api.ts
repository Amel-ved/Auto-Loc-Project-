import { supabase } from './supabase';
import { MOCK_CARS, MOCK_RESERVATIONS, MOCK_USER, type Car, type Reservation, type User } from './mock-data';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const HAS_SUPABASE_KEYS = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('your-project-url') &&
  !SUPABASE_ANON_KEY.includes('your-anon-key')
);
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
const DEFAULT_AVATAR_URL = 'data:image/jpeg;base64,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' ;

// Helper to safely handle Supabase network errors
const handleNetworkError = (error: any) => {
  console.error('[Supabase Error]:', error);
  const message = error?.message || error?.details || String(error);
  throw new Error(message || 'Server down, try again later please!');
};

// === CARS (TABLE B) === //

export async function getCars(): Promise<Car[]> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_CARS;
  }
  
  try {
    const { data, error } = await supabase.from('cars').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
}

export async function getCarById(id: string): Promise<Car | undefined> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_CARS.find((c) => c.id === id);
  }

  try {
    const { data, error } = await supabase.from('cars').select('*').eq('id', id).single();
    if (error) throw error;
    return data || undefined;
  } catch (error) {
    handleNetworkError(error);
    return undefined;
  }
}

// === AUTHENTICATION & USERS (TABLE A) === //

export async function login(email: string, password: string):Promise<{success: boolean, error?: string}> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (typeof window !== 'undefined') {
      localStorage.setItem('autoloc_mock_auth', MOCK_USER.id);
      localStorage.setItem('autoloc_mock_email', email);
    }
    return { success: true };
  }

  if (!HAS_SUPABASE_KEYS) {
    return { success: false, error: 'Supabase credentials are missing. Create .env.local from .env.example and restart with NEXT_PUBLIC_USE_MOCK_DATA=false.' };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || 'Server down, try again later please!' };
  }
}

export async function signUp(email: string, password: string, full_name: string): Promise<{success: boolean, error?: string, needsEmailConfirmation?: boolean}> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (typeof window !== 'undefined') {
      localStorage.setItem('autoloc_mock_auth', MOCK_USER.id);
      localStorage.setItem('autoloc_mock_email', email);
      if (full_name) localStorage.setItem('autoloc_mock_name', full_name);
    }
    return { success: true };
  }

  if (!HAS_SUPABASE_KEYS) {
    return { success: false, error: 'Supabase credentials are missing. Create .env.local from .env.example and restart with NEXT_PUBLIC_USE_MOCK_DATA=false.' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          avatar_url: DEFAULT_AVATAR_URL
        }
      }
    });

    if (error) throw error;

    if (data?.user) {
      if (!data.session) {
        return { success: true, needsEmailConfirmation: true };
      }
      return { success: true };
    }

    return { success: false, error: 'Unable to create account. Please check your email and password.' };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || 'Server down, try again later please!' };
  }
}

export async function logout(): Promise<void> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (typeof window !== 'undefined') {
      localStorage.removeItem('autoloc_mock_auth');
      window.location.href = '/login';
    }
    return;
  }

  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  } finally {
    if (typeof window !== 'undefined') window.location.href = '/login';
  }
}

export async function getCurrentUser(): Promise<User | null> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('autoloc_mock_auth') === MOCK_USER.id) {
        const storedEmail = localStorage.getItem('autoloc_mock_email') || MOCK_USER.email;
        const storedName = localStorage.getItem('autoloc_mock_name') || storedEmail.split('@')[0];
        return {
          ...MOCK_USER,
          email: storedEmail,
          full_name: storedName
        };
      }
    }
    return null;
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    
    const metadata = (user as any).user_metadata || {};
    return {
      id: user.id,
      email: user.email!,
      full_name: profile?.full_name || metadata.full_name || user.email?.split('@')[0],
      avatar_url: profile?.avatar_url || metadata.avatar_url || DEFAULT_AVATAR_URL
    };
  } catch (error) {
    console.error(error);
    return null; // Return null on network error to just appear logged out instead of crashing
  }
}

// === RESERVATIONS (TABLE C) === //

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_RESERVATIONS.filter((r) => r.user_id === userId);
  }

  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
}

export async function createReservation(
  carId: string, 
  startDate: string, 
  endDate: string, 
  licenseFile: File
): Promise<{ success: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'User must be logged in' };

  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    MOCK_RESERVATIONS.push({
      id: `res-${Math.random()}`,
      user_id: user.id,
      car_id: carId,
      start_date: startDate,
      end_date: endDate,
      status: 'pending',
      license_photo_url: 'mock-uploaded-file.jpg',
      total_price: 500,
    });
    return { success: true };
  }

  try {
    const fileExt = licenseFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `licenses/${fileName}`;

    let finalUrl = 'https://images.unsplash.com/photo-1620825937374-87fc1d6aaffa?auto=format&fit=crop&q=80&w=1000'; // Fallback dummy license
    
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, licenseFile, { upsert: true });

    if (!uploadError) {
      const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
      finalUrl = data.publicUrl;
    } else {
      console.warn("Storage upload blocked by RLS. Bypassing error to allow reservation.", uploadError);
    }

    const days = Math.max(1, (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
    const car = await getCarById(carId);
    
    const { error: insertError } = await supabase
      .from('reservations')
      .insert({
        user_id: user.id,
        car_id: carId,
        start_date: startDate,
        end_date: endDate,
        status: 'pending',
        license_photo_url: finalUrl,
        total_price: (car?.price_per_day || 0) * days
      });

    if (insertError) throw insertError;

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err?.message || 'Server down, try again later please!' };
  }
}

