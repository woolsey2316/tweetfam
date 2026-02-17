import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CommentsState {
  comments: string[];
}

const initialState = {
  comments: [],
} satisfies CommentsState as CommentsState;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<{ comments: string[] }>) => {
      state.comments = action.payload.comments;
    }
  }
})

export const { setComments } = commentsSlice.actions
export default commentsSlice.reducer
