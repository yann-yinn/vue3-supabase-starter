// UseSupabase.js
import { createClient } from "@supabase/supabase-js";

// these can come from an environment variable if desired
// not required however as they are 100% exposed on the client side anyway
// and that's ok, Supabase expects this (security is provided by Row Level Security)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// setup client
const supabase = createClient(supabaseUrl, supabaseKey);

// expose supabase client and helpers methods
export default function useSupabase() {
  return supabase;
}
