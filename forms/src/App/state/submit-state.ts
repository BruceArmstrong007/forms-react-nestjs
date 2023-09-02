import { create } from "zustand";
import { deleteFile, getForms, saveForm, uploadFile } from "../api/submit-request";

export const submitState = create((set, get) => ({
  form: null,
  submit: false,
  getForms: async (formID: string) => {
    const response = await getForms(formID);
    if (response && !response?.statusCode) {
      set((state: any) => ({ ...state, form: response }));
    }
    return response;
  },
  isSubmited: async () => {
    const stored = localStorage.getItem("form");
    if (!stored) {
      localStorage.setItem("form", JSON.stringify({ submit: false }));
      return false;
    }
    const form = JSON.parse(stored);
    set((state: any) => ({ ...state, submit: form.submit }));
    return form.submit;
  },
  saveForm: async (values: any) => {
    const response = await saveForm(values);
    if (response && !response?.statusCode) {
      localStorage.setItem("form", JSON.stringify({ submit: true }));
      set((state: any) => ({ ...state, submit: true }));
    }
    return response;
  },
  uploadFile: async (values: any) => {
    const response = await uploadFile(values);
    return response;
  },
  deleteFile: async (values: any) => {
    const response = await deleteFile(values);
    return response;
  },
}));
