import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './type';
import { UserProfileType, UserRole } from '@components';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    setIsLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggingOut = action.payload;
    },

    setProfile: (state, action: PayloadAction<UserProfileType>) => {
      state.user = action.payload;
    },
    setCurrentRole: (state, action: PayloadAction<UserRole>) => {
      state.currentRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticated, setProfile, setIsLoggingOut, setCurrentRole } = authSlice.actions;

export const authState = authSlice.getInitialState();

export default authSlice.reducer;
