import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [],
  userList: {}, 
  serviceList: [],
  brandList: [],
  ticketList: [],
  paymentDetailList: []
}

export const AdminSlice = createSlice({
  name: 'ADMIN',
  initialState,
  reducers: {
    ADD_USER: (state, action) => {
      state.userData = action.payload.data;
    },
    SET_USER_LIST: (state, action) => {
      state.userList = action.payload.data;
    },
    SET_SERVICE_LIST: (state, action) => {
      state.serviceList = action.payload.data;
    },
    SET_BRAND_LIST: (state, action) => {
      state.brandList = action.payload.data;
    },
    SET_PAYMENT_DETAIL_LIST: (state, action) => {
      state.paymentDetailList = action.payload.data;
    },
  },
})

export const { ADD_USER, SET_USER_LIST, SET_SERVICE_LIST, SET_BRAND_LIST, SET_PAYMENT_DETAIL_LIST } = AdminSlice.actions

export default AdminSlice.reducer;
