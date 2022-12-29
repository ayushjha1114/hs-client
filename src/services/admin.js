import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/auth/admin",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: 'user-list',
        method: 'GET'
      }),
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: `login`,
          method: 'POST',
          body,
        }
      },
    }),
    registerUser: builder.mutation({
      query(body) {
        return {
          url: `register_user`,
          method: 'POST',
          body,
        }
      },
    }),
    updateUserDetail: builder.mutation({
      query(body) {
        return {
          url: `user`,
          method: 'PATCH',
          body,
        }
      },
    }),
  }),
});

export const { useGetAllUserQuery, useLoginMutation, useRegisterUserMutation, useUpdateUserDetailMutation } = adminApi;
