import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from '../util/middleware/auth';

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/auth/admin",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        headers: {
          'Content-type': 'application/json',
          'Authorization': Auth.getAdminAccessToken()
        },
        url: 'user-list',
        method: 'GET'
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        headers: {
          'Content-type': 'application/json',
          'Authorization': Auth.getAdminAccessToken()
        },
        url: 'register-user',
        method: 'POST',
        body,
      }),
    }),
    updateUserDetail: builder.mutation({
      query: (body) => ({
        headers: {
          'Content-type': 'application/json',
          'Authorization': Auth.getAdminAccessToken()
        },
        url: 'user',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useLoginMutation, useRegisterUserMutation, useUpdateUserDetailMutation } = adminApi;
