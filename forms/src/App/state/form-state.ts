import { create } from "zustand";
import {
  deleteFile,
  uploadFile,
  saveForm,
  getForms,
  deleteResponse,
  deleteForm,
  getResponses
} from "../api/form-request";
import { UploadOptions } from "../../shared/utils/enums";

export const formState = create((set, get) => ({
  forms: [],
  responses: [],
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
  getResponses: async () => {
    const response = await getResponses();
    if (response && !response?.statusCode) {
      set((state: any) => ({ ...state, responses: response }));
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
  deleteResponse: async (responseID: string) => {
    const response = await deleteResponse(responseID);
    return response;
  },
}));
