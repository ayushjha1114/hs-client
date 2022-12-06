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
  }),
});

export const { useGetAllUsersQuery } = adminApi;
