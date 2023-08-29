import { create } from "zustand";
import { produce } from "immer";
import { login, logout, refresh } from "../api/auth-request";
import { register } from "../../serviceWorker";

export const authState = create((set) => ({
  token: {
    accessToken: null,
    refreshToken: localStorage.getItem("refreshToken"),
  },
  logout: async () =>{
    const response = await logout();
    set(
      produce((state: any) => {
        state.token.accessToken = null;
        state.token.refreshToken = null;
        localStorage.removeItem("refreshToken");
      })
    )
    return response
  },
  login: async (values: any) => {
    const response = await login(values);
    if (response && !response?.statusCode) {
      set(
        produce((state: any) => {
          state.token.accessToken = response?.accessToken;
          state.token.refreshToken = response?.refreshToken;
        })
      );
      localStorage.setItem("refreshToken", response?.refreshToken);
    }
    return response;
  },
  register: async (values: any) => {
    return await register(values);
  },
  refresh: async () => {
    const response = await refresh();
    if(response && !response?.statusCode){
      set(
        produce((state: any) => {
          state.token.accessToken = response?.accessToken;
        })
      );
    }
    return response;
  }
}));
