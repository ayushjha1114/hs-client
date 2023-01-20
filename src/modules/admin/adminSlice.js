import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultUserData: {},
  userList: [],
  amcList: [],
  serviceList: [],
  brandList: [],
  ticketList: [],
  paymentDetailList: [],
};

export const AdminSlice = createSlice({
  name: "ADMIN",
  initialState,
  reducers: {
    SET_DEFAULT_USER_DATA: (state, action) => {
      state.defaultUserData = action.payload.data;
    },
    SET_USER_LIST: (state, action) => {
      state.userList = action.payload.data;
    },
    SET_AMC_LIST: (state, action) => {
      state.amcList = action.payload.data;
    },
    SET_SERVICE_LIST: (state, action) => {
      state.serviceList = action.payload.data;
    },
    SET_BRAND_LIST: (state, action) => {
      state.brandList = action.payload.data;
    },
    SET_PAYMENT_DETAIL_LIST: (state, action) => {
      state.paymentDetailList = action.payload.data;
    }
  },
});

export const {
  SET_DEFAULT_USER_DATA,
  SET_USER_LIST,
  SET_SERVICE_LIST,
  SET_BRAND_LIST,
  SET_PAYMENT_DETAIL_LIST,
  SET_AMC_LIST,
} = AdminSlice.actions;

export default AdminSlice.reducer;
