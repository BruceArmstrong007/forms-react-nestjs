import { create } from "zustand";
import { produce } from "immer";
import { LoginRequest, LogoutRequest, RefreshTokenRequest, RegisterRequest } from "../routes/auth/AuthRequests";

export const authState = create((set) => ({
  auth: {
    accessToken: null,
    refreshToken: localStorage.getItem("refreshToken"),
  },
  logout: async () =>{
    const response = await LogoutRequest();
    set(
      produce((state: any) => {
        state.auth.accessToken = null;
        state.auth.refreshToken = null;
        localStorage.removeItem("refreshToken");
      })
    )
    return response
  },
  login: async (values: any) => {
    const response = await LoginRequest(values);
    if (response && !response?.statusCode) {
      set(
        produce((state: any) => {
          state.auth.accessToken = response?.accessToken;
          state.auth.refreshToken = response?.refreshToken;
        })
      );
      localStorage.setItem("refreshToken", response?.refreshToken);
    }
    return response;
  },
  register: async (values: any) => {
    return await RegisterRequest(values);
  },
  refresh: async () => {
    const response = await RefreshTokenRequest();
    if(response && !response?.statusCode){
      set(
        produce((state: any) => {
          state.auth.accessToken = response?.accessToken;
        })
      );
    }
    return response;
  }
}));
