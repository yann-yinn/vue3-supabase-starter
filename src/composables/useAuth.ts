import useStore from "@/stores";
import useSupabase from "@/composables/useSupabase";

const supabase = useSupabase();

function login(values: { email: string; password: string }) {
  const store = useStore();
  return supabase.auth.signIn(values).then((response) => {
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

function getUser() {
  const store = useStore();
  return store.user;
}

export default function useAuth() {
  return { login, logout, getUser, register };
}
