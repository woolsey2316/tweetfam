import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Post } from "../types/post"

const initialState = { posts: [] } satisfies { posts: Post[] } as { posts: Post[] };

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setPost: (state, action: PayloadAction<Post>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload
        return post;
      });
      state.posts = updatedPosts;
    },
  }
})

export const { setPosts, setPost } = postsSlice.actions
export default postsSlice.reducer
