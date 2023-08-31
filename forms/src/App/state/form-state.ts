import { create } from "zustand";
import { produce } from "immer";
import { deleteFile, uploadFile } from "../api/form-request";
import { UploadOptions } from "../../shared/utils/enums";

export const formState = create((set) => ({
  forms: [],
  uploadFile: async (file: any, type: UploadOptions) => {
    const response = await uploadFile(file, type);
    return response;
  },
  deleteFile: async (fileName: string) => {
    const response = await deleteFile(fileName);
    return response;
  },
}));
