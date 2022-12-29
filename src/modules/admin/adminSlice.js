import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // userData: {
  //   first_name: '',
  //   middle_name: '',
  //   last_name: '',
  //   email: '', 
  //   password: '', 
  //   mobile: '',
  //   dob: '',
  //   gender: '',
  //   aadhaar: '',
  //   current_address: '', 
  //   current_city: '', 
  //   current_state: '',
  //   current_pincode: '',
  //   permanent_address: '', 
  //   permanent_city: '', 
  //   permanent_state: '',
  //   permanent_pincode: '',
  // }
  userData: [],
  userList: {}
}

export const AdminSlice = createSlice({
  name: 'ADMIN',
  initialState,
  reducers: {
    ADD_USER: (state, action) => {
      console.log("🚀 ~ file: adminSlice.js:20 ~ action", action)
      state.userData = action.payload.data;
    },
    SET_USER_LIST: (state, action) => {
      console.log("🚀 ~ file: adminSlice.js:20 ~ action", action)
      state.userList = action.payload.data;
    },
  },
})

export const { ADD_USER, SET_USER_LIST } = AdminSlice.actions

export default AdminSlice.reducer;