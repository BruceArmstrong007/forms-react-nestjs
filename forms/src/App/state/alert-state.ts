import { create } from "zustand";
import { produce } from "immer";

const Timeout = 2000;

export const alertState = create((set) => ({
  alert: {
    title: null,
    message: null,
    type: null,
  },
  success: (title: any, message: any) => {
    set(
      produce((state) => {
        state.alert.title = title;
        state.alert.message = message;
        state.alert.type = "success";
      })
    );
    setTimeout(() => {
      set(
        produce((state) => {
          state.alert.title = null;
          state.alert.message = null;
          state.alert.type = null;
        })
      );
    }, Timeout);
  },
  error: (title: any, message: any) => {
    set(
      produce((state) => {
        state.alert.title = title;
        state.alert.error = message;
        state.alert.type = "error";
      })
    );
    setTimeout(() => {
      set(
        produce((state) => {
          state.alert.title = null;
          state.alert.message = null;
          state.alert.type = null;
        })
      );
    }, Timeout);
  },
}));
