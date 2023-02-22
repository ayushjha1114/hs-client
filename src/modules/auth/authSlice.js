import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  snackBar: {
    open: false,
    mesaage: '',
    variant: 'success',
  }
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload.data;
    },
    SET_SNACKBAR: (state, action) => {
      const { open, message, variant } = action.payload;
      state.snackBar.open = open;
      state.snackBar.message = message;
      state.snackBar.variant = variant;
    },
  },
})

export const { SET_LOADING, SET_SNACKBAR } = AuthSlice.actions

export default AuthSlice.reducer;
