import { defineStore } from "pinia";
import { User } from "@/types";
import { reactive, toRefs, computed } from "vue";

type UserOrNull = User | null;
type StringOrNull = string | null;

interface State {
  user: UserOrNull;
  forgotPasswordEmail: StringOrNull;
}

export default defineStore("main", () => {
  const state = reactive<State>({
    user: getLocalStorageUser(),
    forgotPasswordEmail: null,
  });

  function setUser(value: UserOrNull) {
    state.user = value;
    setLocalStorageUser(state.user);
  }

  function setForgotPasswordEmail(email: StringOrNull) {
    state.forgotPasswordEmail = email;
  }

  return {
    ...toRefs(state), // le .value sera "unwrappé" par le store (cf https://github.com/kiaking/rfcs/blob/vuex-5/active-rfcs/0000-vuex-5.md#creating-a-store-via-vuex-instance)
    setUser,
    setForgotPasswordEmail,
  };
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
