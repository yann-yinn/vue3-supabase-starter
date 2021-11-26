import { defineStore } from "pinia";
import { User } from "@/types";

export const useStore = defineStore("main", {
  state: () => {
    return {
      user: getLocalStorageUser(),
    };
  },
});

useStore().$subscribe((mutation, state) => {
  setLocalStorageUser(state.user);
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
  let user: null | User = null;
  const userJsonString = localStorage.getItem("user");
  if (userJsonString) {
    user = JSON.parse(userJsonString);
  }
  return user;
}
