import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Expense {
  _id: string
  amount: number
  category: string
  purpose: string
  date: string
}

export interface Limit {
  _id: string
  category: string
  amount: number
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Expense', 'Limit'],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => 'expenses',
      providesTags: ['Expense'],
    }),
    addExpense: builder.mutation<Expense, Omit<Expense, '_id'>>({
      query: (expense) => ({
        url: 'expenses',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),
    updateExpense: builder.mutation<Expense, Expense>({
      query: (expense) => ({
        url: `expenses/${expense._id}`,
        method: 'PUT',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),
    deleteExpense: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
    getLimits: builder.query<Limit[], void>({
      query: () => 'limits',
      providesTags: ['Limit'],
    }),
    addLimit: builder.mutation<Limit, Omit<Limit, '_id'>>({
      query: (limit) => ({
        url: 'limits',
        method: 'POST',
        body: limit,
      }),
      invalidatesTags: ['Limit'],
    }),
    updateLimit: builder.mutation<Limit, Limit>({
      query: (limit) => ({
        url: `limits/${limit._id}`,
        method: 'PUT',
        body: limit,
      }),
      invalidatesTags: ['Limit'],
    }),
    deleteLimit: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `limits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Limit'],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetLimitsQuery,
  useAddLimitMutation,
  useUpdateLimitMutation,
  useDeleteLimitMutation,
} = api

