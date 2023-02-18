import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../util/middleware/auth";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://dgsoft.org/auth/admin",
    baseUrl: "http://localhost:3001/auth/admin",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `user-list?limit=${data.limit}&offset=${data.offset}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `user/${id}`,
        method: "GET",
      }),
    }),
    getServiceById: builder.query({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `service/${id}`,
        method: "GET",
      }),
    }),
    getAllBrand: builder.query({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `brand-list?limit=${data.limit}&offset=${data.offset}`,
        method: "GET",
      }),
    }),
    getAllService: builder.query({
      query: () => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `service-list`,
        method: "GET",
      }),
    }),
    getAllTicket: builder.query({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `ticket-list?limit=${data.limit}&offset=${data.offset}`,
        method: "GET",
      }),
    }),
    getAllPaymentDetail: builder.query({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `payment-detail-list?limit=${data.limit}&offset=${data.offset}`,
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: "register-user",
        method: "POST",
        body,
      }),
    }),
    updateUserDetail: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: "user",
        method: "PATCH",
        body,
      }),
    }),
    createBrand: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: "brand",
        method: "POST",
        body,
      }),
    }),
    updateBrandDetail: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `brand/${data.id}`,
        method: "PATCH",
        body: {
          name: data.name,
          description: data.description
        }
      }),
    }),
    createService: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: "service",
        method: "POST",
        body,
      }),
    }),
    updateServiceDetail: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `service/${data.id}`,
        method: "PATCH",
        body: data
      }),
    }),
    createTicket: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: "ticket",
        method: "POST",
        body,
      }),
    }),
    savePaymentDetail: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: "payment-detail",
        method: "POST",
        body,
      }),
    }),
    updatePaymentDetail: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `payment-detail/${data.id}`,
        method: "PATCH",
        body: data
      }),
    }),
    updateTicket: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: Auth.getAdminAccessToken(),
        },
        url: `ticket/${data.id}`,
        method: "PATCH",
        body: data
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useLoginMutation,
  useRegisterUserMutation,
  useUpdateUserDetailMutation,
  useGetUserByIdQuery,
  useGetServiceByIdQuery,
  useGetAllBrandQuery,
  useCreateBrandMutation, 
  useUpdateBrandDetailMutation,
  useGetAllServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceDetailMutation,
  useCreateTicketMutation,
  useGetAllTicketQuery,
  useSavePaymentDetailMutation,
  useGetAllPaymentDetailQuery,
  useUpdatePaymentDetailMutation,
  useUpdateTicketMutation
} = adminApi;
