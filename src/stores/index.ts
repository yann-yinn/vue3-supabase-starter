import { defineStore } from "pinia";
import { User } from "@/types";
import { reactive, toRefs } from "vue";

type UserOrNull = User | null;

export default defineStore("main", () => {
  const state = reactive({
    user: getLocalStorageUser(),
    forgotPasswordEmail: null as string | null,
  });

  function setForgotPasswordEmail(email: string) {
    state.forgotPasswordEmail = email;
  }

  function setUser(value: UserOrNull) {
    state.user = value;
    setLocalStorageUser(value);
  }

  return { ...toRefs(state), setUser, setForgotPasswordEmail };
});

function setLocalStorageUser(user: UserOrNull) {
  // save user object to local storage, if different from null
  if (user === null) {
    localStorage.removeItem("user");
  } else {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

function getLocalStorageUser() {
  let user: UserOrNull = null;
  const userJsonString = localStorage.getItem("user");
  if (userJsonString) {
    user = JSON.parse(userJsonString);
  }
  return user;
}
