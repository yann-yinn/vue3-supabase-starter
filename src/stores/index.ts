import { defineStore } from "pinia";
import { User } from "@/types";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("main", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      user: null as User | null,
    };
  },
});
