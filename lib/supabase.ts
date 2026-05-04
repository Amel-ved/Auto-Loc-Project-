import { createClient } from '@supabase/supabase-js';

// Ensure the URL has https:// so createClient doesn't crash on invalid URLs
let url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
if (!url.startsWith('http')) {
  url = `https://${url}`;
}

const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(url, key);
