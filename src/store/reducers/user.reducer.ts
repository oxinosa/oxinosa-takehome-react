import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "../interfaces/user.interface";
import {fetchUserById} from "../actions/user.action";

const initialState: UserState = {
  role: null,
  username: '',
  isActive: false,
  id: ''
} as UserState;


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state: UserState, { payload }) => {
      state.role = payload.role;
      state.id = payload.id;
      state.isActive = payload.is_active;
      state.username = payload.username;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      userSlice.caseReducers.setData(state, action);
    })
  }
})

export default userSlice.reducer