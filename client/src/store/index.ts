import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@state/auth.js'
import postsReducer from '@state/postsSlice.js'
import commentsReducer from '@state/commentsSlice.js'
import usersReducer from '@state/usersSlice.js'
import uiReducer from '@state/uiSlice.js'
import notificationsReducer from '@state/notificationsSlice.js'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  // Persist auth, user, and ui (for theme preference)
  whitelist: ['auth', 'user', 'ui']
}

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  user: usersReducer,
  ui: uiReducer,
  notifications: notificationsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
