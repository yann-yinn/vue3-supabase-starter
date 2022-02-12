import useStore from "@/stores";
import useSupabase from "./useSupabase";

function login(values: { email: string; password: string }) {
  const store = useStore();
  const supabase = useSupabase();
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

async function logout() {
  const store = useStore();
  const supabase = useSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  store.setUser(null);
}

async function getUser() {
  let result = null;
  const supabase = useSupabase();
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

function register(values: { email: string; password: string }) {
  const store = useStore();
  const supabase = useSupabase();
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

function resetPassword(email: string) {
  const supabase = useSupabase();
  return supabase.auth.api.resetPasswordForEmail(email);
}

export default function useAuth() {
  return { register, login, logout, getUser, resetPassword };
}
