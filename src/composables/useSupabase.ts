// UseSupabase.js
import { createClient } from "@supabase/supabase-js";
import useStore from "@/stores";

// these can come from an environment variable if desired
// not required however as they are 100% exposed on the client side anyway
// and that's ok, Supabase expects this (security is provided by Row Level Security)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// setup client
const supabase = createClient(supabaseUrl, supabaseKey);

function login(values: { email: string; password: string }) {
  const store = useStore();
  return supabase.auth.signIn(values).then((response) => {
    if (response.error) {
      // sauvegarder l'email du login dans le store, pour pouvoir
      // pré-remplir le champ "email" du formulaire de "forgot-password"
      store.setForgotPasswordEmail(values.email);
      throw new Error(response.error.message);
    }
    if (response.user) {
      store.setUser({
        id: response.user.id,
        email: response.user.email as string,
      });
    }
    return response;
  });
}

function register(values: { email: string; password: string }) {
  const store = useStore();
  return supabase.auth.signUp(values).then((response) => {
    if (response.error) {
      throw new Error(response.error.message);
    }
    if (response.user) {
      store.setUser({
        id: response.user.id,
        email: response.user.email as string,
      });
    }
    return response;
  });
}

async function logout() {
  const store = useStore();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  store.setUser(null);
}

async function getUser() {
  let result = null;
  const session = supabase.auth.session();
  if (session) {
    const { user, error } = await supabase.auth.api.getUser(
      session.access_token
    );
    if (error) throw error;
    result = user;
  }
  return Promise.resolve(result);
}

// expose supabase client and helpers methods
export default function useSupabase() {
  return { supabase, login, logout, register, getUser };
}
