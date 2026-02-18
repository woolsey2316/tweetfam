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
      state._id = action.payload.user._id;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.picturePath = action.payload.user.picturePath;
      state.friends = action.payload.user.friends;
      state.location = action.payload.user.location;
      state.occupation = action.payload.user.occupation;
      state.viewedProfile = action.payload.user.viewedProfile;
      state.impressions = action.payload.user.impressions;
    },
    setFriends: (state, action: PayloadAction<{ friends: User[] }>) => {
      state.friends = action.payload.friends;
    }
  }
})

export const { setUser, setFriends } = usersSlice.actions
export default usersSlice.reducer
