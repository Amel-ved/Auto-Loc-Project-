import { supabase } from './supabase';
import { MOCK_CARS, MOCK_RESERVATIONS, MOCK_USER, type Car, type Reservation, type User } from './mock-data';

// Toggle between mock data and real Supabase backend via environment variables
// Default to true if not explicitly set to false to prevent breaking the app before Supabase is connected.
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

// === CARS (TABLE B) === //

export async function getCars(): Promise<Car[]> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_CARS;
  }
  
  const { data, error } = await supabase.from('cars').select('*');
  if (error) {
    console.error('Error fetching cars from Supabase:', error);
    return [];
  }
  return data;
}

export async function getCarById(id: string): Promise<Car | undefined> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_CARS.find((c) => c.id === id);
  }

  const { data, error } = await supabase.from('cars').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching car ${id}:`, error);
    return undefined;
  }
  return data;
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

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
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

  await supabase.auth.signOut();
  if (typeof window !== 'undefined') window.location.href = '/login';
}

export async function getCurrentUser(): Promise<User | null> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('autoloc_mock_auth') === MOCK_USER.id) return MOCK_USER;
    }
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch the full profile from the profiles table
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  
  return {
    id: user.id,
    email: user.email!,
    full_name: profile?.full_name || user.email?.split('@')[0],
    avatar_url: profile?.avatar_url
  };
}

// === RESERVATIONS (TABLE C) === //

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_RESERVATIONS.filter((r) => r.user_id === userId);
  }

  // Thanks to Supabase RLS, we only get reservations belonging to the authenticated user.
  // But we pass the user ID just to be explicit.
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
  return data;
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
    console.log(`[MOCK API] Reservation created for car ${carId}.`);
    MOCK_RESERVATIONS.push({
      id: `res-${Math.random()}`,
      user_id: user.id,
      car_id: carId,
      start_date: startDate,
      end_date: endDate,
      status: 'pending',
      license_photo_url: 'mock-uploaded-file.jpg',
      total_price: 500, // mock static price
    });
    return { success: true };
  }

  try {
    // 1. Upload license file to Supabase Storage
    const fileExt = licenseFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `licenses/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, licenseFile);

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    // Get public URL of the uploaded document
    const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);

    // 2. Insert the reservation into Table C
    // We calculate total price dynamically. Assuming 1 day for simplicity if date parsing fails
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

    if (insertError) throw new Error(`Reservation failed: ${insertError.message}`);

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
