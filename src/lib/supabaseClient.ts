// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🛑 Final Error Check Logic 🛑
if (!supabaseUrl || !supabaseAnonKey) {
    // Keys නැවතත් Load නොවුවහොත්, මෙම Error එක දමනු ඇත.
    throw new Error('Supabase URL or Anon Key is missing. Check your next.config.mjs file for NEXT_PUBLIC_SUPABASE_URL!');
}

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);