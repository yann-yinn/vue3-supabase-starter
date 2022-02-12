import useSupabase from "./useSupabase";
import type { User } from "@/types";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

const user = useStorage<User | null>("user", null, undefined, {
  serializer: {
    read: (v: any) => (v ? JSON.parse(v) : null),
    write: (v: any) => JSON.stringify(v),
  },
});
const forgotPasswordEmail = ref<string>("");

function login(values: { email: string; password: string }) {
  const supabase = useSupabase();
  return supabase.auth.signIn(values).then((response) => {
    if (response.error) {
      // sauvegarder l'email du login pour pouvoir
      // pré-remplir le champ "email" du formulaire de "forgot-password"
      forgotPasswordEmail.value = values.email;
      throw new Error(response.error.message);
    }
    if (response.user) {
      user.value = response.user;
    }
    return response;
  });
}

async function logout() {
  const supabase = useSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  user.value = null;
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
  const supabase = useSupabase();
  return supabase.auth.signUp(values).then((response) => {
    if (response.error) {
      throw new Error(response.error.message);
    }
    if (response.user) {
      user.value = response.user;
    }
    return response;
  });
}

function resetPassword(email: string) {
  const supabase = useSupabase();
  return supabase.auth.api.resetPasswordForEmail(email);
}

export default function useAuth() {
  return {
    user,
    register,
    login,
    logout,
    getUser,
    resetPassword,
    forgotPasswordEmail,
  };
}
