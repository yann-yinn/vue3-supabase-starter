import { defineStore } from "pinia";
import { User } from "@/types";
import { ref } from "vue";

type UserNullable = User | null;

export default defineStore("main", () => {
  const user = ref<UserNullable>(getLocalStorageUser());
  const forgotPasswordEmail = ref<string | null>(null);

  function setUser(value: UserNullable) {
    user.value = value;
    setLocalStorageUser(value);
  }

  function setForgotPasswordEmail(email: string) {
    forgotPasswordEmail.value = email;
  }

  return { user, setUser, forgotPasswordEmail, setForgotPasswordEmail };
});

function setLocalStorageUser(user: User | null) {
  // save user object to local storage, if different from null
  if (user === null) {
    localStorage.removeItem("user");
  } else {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

function getLocalStorageUser() {
  let user: UserNullable = null;
  const userJsonString = localStorage.getItem("user");
  if (userJsonString) {
    user = JSON.parse(userJsonString);
  }
  return user;
}
