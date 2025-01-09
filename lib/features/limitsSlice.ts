'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CategoryLimit {
  category: string
  limit: number
}

interface LimitsState {
  monthlyLimit: number
  categoryLimits: Record<string, number>
  isInitialized: boolean
}

const initialState: LimitsState = {
  monthlyLimit: 0,
  categoryLimits: {},
  isInitialized: false,
}

const limitsSlice = createSlice({
  name: 'limits',
  initialState,
  reducers: {
    setMonthlyLimit: (state, action: PayloadAction<number>) => {
      state.monthlyLimit = action.payload
    },
    setCategoryLimit: (state, action: PayloadAction<CategoryLimit>) => {
      state.categoryLimits[action.payload.category] = action.payload.limit
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const { setMonthlyLimit, setCategoryLimit, setInitialized } = limitsSlice.actions
export default limitsSlice.reducer

