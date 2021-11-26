import { defineStore } from "pinia";
import { User } from "@/types";

function userFromLocalStorage() {
  let user: null | User = null;
  const userJsonString = localStorage.getItem("user");
  if (userJsonString) {
    user = JSON.parse(userJsonString);
  }
  return user;
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("main", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      user: userFromLocalStorage(),
    };
  },
});

useStore().$subscribe((mutation, state) => {
  // save user object to local storage, if different from null
  if (state.user === null) {
    localStorage.removeItem("user");
  } else {
    localStorage.setItem("user", JSON.stringify(state.user));
  }
});
