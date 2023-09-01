import { create } from "zustand";
import {
  deleteFile,
  uploadFile,
  saveForm,
  getForms,
  deleteForm
} from "../api/form-request";
import { UploadOptions } from "../../shared/utils/enums";

export const formState = create((set, get) => ({
  forms: [],
  uploadFile: async (file: any, type: UploadOptions) => {
    const response = await uploadFile(file, type);
    return response;
  },
  deleteFile: async (fileName: string) => {
    const response = await deleteFile(fileName);
    return response;
  },
  getForms: async () => {
    const response = await getForms();
    if (response && !response?.statusCode) {
      set((state: any) => ({ ...state, forms: response }));
    }
    return response;
  },
  saveForm: async (values: any) => {
    const response = await saveForm(values);
    return response;
  },
  deleteForm: async (formID: string) => {
    const response = await deleteForm(formID);
    return response;
  },
}));
