

/*
Defines authentication and role-based state.
This simulates a JWT-based login flow.
*/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Role = "admin" | "projectManager" | "developer" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Role>) => {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
