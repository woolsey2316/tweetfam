import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@state/auth'
import postsReducer from '@state/postsSlice'
import commentsReducer from '@state/commentsSlice'
import usersReducer from '@state/usersSlice'
import uiReducer from '@state/uiSlice'
import notificationsReducer from '@state/notificationsSlice'

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
