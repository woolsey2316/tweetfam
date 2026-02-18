import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@state/auth.js'
import postsReducer from '@state/postsSlice.js'
import commentsReducer from '@state/commentsSlice.js'
import usersReducer from '@state/usersSlice.js'
import uiReducer from '@state/uiSlice.js'
import notificationsReducer from '@state/notificationsSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    user: usersReducer,
    ui: uiReducer,
    notifications: notificationsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
