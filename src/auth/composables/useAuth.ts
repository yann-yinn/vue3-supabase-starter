import useSupabase from "./useSupabase";
import type { User } from "@supabase/gotrue-js/src/lib/types";
import { ref } from "vue";
import { useStorage, StorageSerializers } from "@vueuse/core";
const supabase = useSupabase();

const user = useStorage<User | null>("user", null, undefined, {
  serializer: StorageSerializers.object,
});
const forgotPasswordEmail = ref<string>("");

function login(values: { email: string; password: string }) {
  return supabase.auth.signIn(values).then((response) => {
    if (response.error) {
      // En cas d'erreur au login, sauvegarder l'email pour pouvoir
      // pré-remplir le champ "email" du formulaire de "forgot-password"
      forgotPasswordEmail.value = values.email;
      throw new Error(response.error.message);
    }
    // succès de la réponse, sauvegarder notre utilisateur
    // dans notre variable réactive globale "user"
    if (response.user) {
      user.value = response.user;
    }
    return response;
  });
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  // supprimer de la mémoire de l'app notre user
  user.value = null;
}

/**
 * Récupérer depuis le serveur distant notre objet utilisateur
 * @returns
 */
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
  return result;
}

function register(values: { email: string; password: string }) {
  return supabase.auth.signUp(values);
}

function resetPassword(email: string) {
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
