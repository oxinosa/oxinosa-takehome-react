import {createSlice} from "@reduxjs/toolkit";

interface GlobalUIState {
  loading: boolean
}

const initialState: GlobalUIState = {
  loading: false
} as GlobalUIState;

export const uiSlice = createSlice({
  name: 'globalUI',
  initialState,
  reducers: {
    setLoading: (state: GlobalUIState, action) => {
      state.loading = action.payload;
    }
  }
})

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;