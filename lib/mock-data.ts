export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
};

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  image_url: string;
  category: 'Sedan' | 'SUV' | 'Luxury' | 'Sports';
  status: 'available' | 'rented' | 'maintenance';
};

export type Reservation = {
  id: string;
  user_id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  license_photo_url?: string; // Points to Storage bucket
  total_price: number;
};

export const MOCK_CARS: Car[] = [
  {
    id: 'car-1',
    brand: 'Mercedes-Benz',
    model: 'G-Class AMG 63',
    year: 2024,
    price_per_day: 90000,
    image_url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000',
    category: 'Luxury',
    status: 'available',
  },
  {
    id: 'car-2',
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    price_per_day: 70000,
    image_url: 'https://images.unsplash.com/photo-1503376760367-1b01d9321523?auto=format&fit=crop&q=80&w=1000',
    category: 'Sports',
    status: 'available',
  },
  {
    id: 'car-3',
    brand: 'BMW',
    model: 'X5 M',
    year: 2024,
    price_per_day: 56000,
    image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000',
    category: 'SUV',
    status: 'available',
  },
  {
    id: 'car-4',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price_per_day: 64000,
    image_url: 'https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&q=80&w=1000',
    category: 'Sedan',
    status: 'available',
  },
  {
    id: 'car-5',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2025,
    price_per_day: 80000,
    image_url: 'https://images.unsplash.com/photo-1612197520383-0f22fc811c23?auto=format&fit=crop&q=80&w=1000',
    category: 'Luxury',
    status: 'available',
  },
  {
    id: 'car-6',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2024,
    price_per_day: 62000,
    image_url: 'https://images.unsplash.com/photo-1542367597-1835f5cbf1f0?auto=format&fit=crop&q=80&w=1000',
    category: 'SUV',
    status: 'available',
  },
];

export const MOCK_USER: User = {
  id: 'user-1',
  email: 'client@autoloc.dz',
  full_name: 'Amel Ved',
  avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    user_id: 'user-1',
    car_id: 'car-1',
    start_date: '2026-05-15',
    end_date: '2026-05-18',
    status: 'confirmed',
    license_photo_url: 'mock-license-url.jpg',
    total_price: 270000,
  }
];
