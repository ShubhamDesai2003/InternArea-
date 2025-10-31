import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState{
    user: null | {uid: string, email:string};
}

const initialState: UserState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      login: (state, action: PayloadAction<UserState["user"]>) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
  });

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
