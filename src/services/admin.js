import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../util/middleware/auth";

export const adminApi = createApi({
	reducerPath: "adminApi",
	tagTypes: ["User", "Service", "Brand", "Ticket", "Payment", "Follow-up"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://dgsoft.org/auth/admin",
		// baseUrl: "http://localhost:3002/auth/admin",
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
			providesTags: ["User"],
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
			providesTags: ["User"],
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
			providesTags: ["Service"],
		}),
		getTicketDetailById: builder.query({
			query: (id) => ({
				headers: {
					"Content-type": "application/json",
					Authorization: Auth.getAdminAccessToken(),
				},
				url: `view-ticket/${id}`,
				method: "GET",
			}),
			providesTags: ["Ticket"],
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
			providesTags: ["Brand"],
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
			providesTags: ["Service"],
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
			providesTags: ["Ticket", "Payment"],
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
			providesTags: ["Ticket", "Payment"],
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
			invalidatesTags: ["User"],
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
			invalidatesTags: ["User"],
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
			invalidatesTags: ["Brand"],
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
					description: data.description,
				},
			}),
			invalidatesTags: ["Brand"],
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
			invalidatesTags: ["Service"],
		}),
		updateServiceDetail: builder.mutation({
			query: (data) => ({
				headers: {
					"Content-type": "application/json",
					Authorization: Auth.getAdminAccessToken(),
				},
				url: `service/${data.id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Service"],
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
			invalidatesTags: ["Ticket"],
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
			invalidatesTags: ["Payment", "Ticket"],
		}),
		saveFollowUp: builder.mutation({
			query: (body) => ({
				headers: {
					"Content-type": "application/json",
					Authorization: Auth.getAdminAccessToken(),
				},
				url: "follow-up",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Follow-up", "Ticket"],
		}),
		updatePaymentDetail: builder.mutation({
			query: (data) => ({
				headers: {
					"Content-type": "application/json",
					Authorization: Auth.getAdminAccessToken(),
				},
				url: `payment-detail/${data.id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Payment", "Ticket"],
		}),
		updateTicket: builder.mutation({
			query: (data) => ({
				headers: {
					"Content-type": "application/json",
					Authorization: Auth.getAdminAccessToken(),
				},
				url: `ticket/${data.id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Payment", "Ticket"],
		}),
		getUserListBySearch: builder.mutation({
			query: (body) => ({
				headers: {
					"Content-type": "application/json",
					Authorization: Auth.getAdminAccessToken(),
				},
				url: "user-list-by-search",
				method: "POST",
				body,
			}),
		}),
		invalidatesTags: ["User"],
	}),
});

export const {
	useGetAllUserQuery,
	useLoginMutation,
	useRegisterUserMutation,
	useUpdateUserDetailMutation,
	useGetUserByIdQuery,
	useGetServiceByIdQuery,
	useGetTicketDetailByIdQuery,
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
	useUpdateTicketMutation,
	useGetUserListBySearchMutation,
	useSaveFollowUpMutation,
} = adminApi;
