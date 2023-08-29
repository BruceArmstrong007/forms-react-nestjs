import { create } from "zustand";
import { produce } from "immer";
import { profile } from "../api/admin-request";

export const adminState = create((set) => ({
  _id: null,
  username: null,
  name: null,
  forms: [],
  createdAt: null,
  updatedAt: null,
  profile: async () => {
    const response = await profile();
    console.log(response);
    if(response && !response?.statusCode) {
      set(produce((state: any) => ({ ...response })));
    }
    return response;
  },
}));
