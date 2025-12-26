import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
Defines authentication and role-based state.
This simulates a JWT-based login flow.
*/

export type UserRole = "Admin" | "ProjectManager" | "Developer";

interface AuthState {
  token: string | null;
  role: UserRole | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; role: UserRole }>
    ) {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
