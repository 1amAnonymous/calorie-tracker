import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form';

const initialState = {
  dietData: null,
  isLoading: false
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDietData: (state, action) => {
      state.dietData = action.payload
    },
    setIsLoading:(state,action)=>{
      state.isLoading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDietData,setIsLoading } = counterSlice.actions

export default counterSlice.reducer;