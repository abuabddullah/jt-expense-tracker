'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Expense {
  id: string
  amount: number
  category: string
  purpose: string
  date: string
}

interface ExpensesState {
  items: Expense[]
  loading: boolean
  error: string | null
}

const initialState: ExpensesState = {
  items: [],
  loading: false,
  error: null,
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.items.push(action.payload)
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload
    },
    clearExpenses: (state) => {
      state.items = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addExpense, setExpenses, clearExpenses, setLoading, setError } = expensesSlice.actions
export default expensesSlice.reducer

