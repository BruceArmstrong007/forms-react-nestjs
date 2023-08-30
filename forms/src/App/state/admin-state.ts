import { create } from "zustand";
import { produce } from "immer";
import { profile, update, uploadProfile } from "../api/admin-request";

export const adminState = create((set) => ({
  _id: null,
  username: null,
  name: null,
  forms: [],
  createdAt: null,
  updatedAt: null,
  profile: null,
  getProfile: async () => {
    const response = await profile();
    if(response && !response?.statusCode) {
      set(produce((state: any) => ({ ...response })));
    }
    return response;
  },
  update: async (values: any) => {
    const response = await update(values);
    if(response && !response?.statusCode) {
      set(produce((state: any) => ({ ...values })));
    }
    return response;
  },
  uploadProfile: async (values: any) => {
    const response = await uploadProfile(values);
    if(response && !response?.statusCode) {
      set(produce((state: any) => ({ ...values })));
    }
    return response;
  }
}));
