import { supabase } from './supabase';
import { MOCK_CARS, MOCK_RESERVATIONS, MOCK_USER, type Car, type Reservation, type User } from './mock-data';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

// Helper to safely handle Supabase network errors
const handleNetworkError = (error: any) => {
  console.error('[Supabase Error]:', error);
  throw new Error('Server down, try again later please!');
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
    if (email === 'admin@admin.com' && password === 'admin') {
      if (typeof window !== 'undefined') localStorage.setItem('autoloc_mock_auth', MOCK_USER.id);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Use admin@admin.com / admin' };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: 'Server down, try again later please!' };
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
      if (localStorage.getItem('autoloc_mock_auth') === MOCK_USER.id) return MOCK_USER;
    }
    return null;
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    
    return {
      id: user.id,
      email: user.email!,
      full_name: profile?.full_name || user.email?.split('@')[0],
      avatar_url: profile?.avatar_url
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

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, licenseFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);

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
        license_photo_url: publicUrl,
        total_price: (car?.price_per_day || 0) * days
      });

    if (insertError) throw insertError;

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: 'Server down, try again later please!' };
  }
}
