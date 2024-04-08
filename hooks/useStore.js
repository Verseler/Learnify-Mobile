import { create } from "zustand";
import { setSecureStore, removeSecureStore } from "../utils/SecureStore";

const useStore = create((set) => ({
  userIsAuthenticated: false,
  addUserToken: (key, value) => {
    setSecureStore(key, value);
    set({ userIsAuthenticated: true });
  },
  removeUserToken: (key) => {
    removeSecureStore(key);
    set({ userIsAuthenticated: false });
  },
}));

export default useStore;
