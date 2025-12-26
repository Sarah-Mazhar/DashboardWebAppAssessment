import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";

/*
This file configures the global Redux store.
Only authentication and user role are stored globally.
*/

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/*
Typed helpers for use throughout the app
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
