import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { type User } from "../types/user.js"

const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picturePath: "",
  friends: [],
  location: "",
  occupation: "",
  viewedProfile: 0,
  impressions: 0,
} satisfies User as User;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      return action.payload.user;
    },
    setFriends: (state, action: PayloadAction<{ friends: User[] }>) => {
      state.friends = action.payload.friends;
    },
    clearUser: () => initialState,
  }
})

export const { setUser, setFriends, clearUser } = usersSlice.actions
export default usersSlice.reducer
