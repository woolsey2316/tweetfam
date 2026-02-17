import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Notification } from "../types/notification"

const initialState = {
  notifications: [],
} satisfies { notifications: Notification[] } as { notifications: Notification[] };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<{ notifications: Notification[] }>) => {
      state.notifications = action.payload.notifications;
    },
    addNotification: (state, action: PayloadAction<{ notification: Notification }>) => {
      state.notifications.push(action.payload.notification);
    },
    removeNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(notification => notification._id !== action.payload.id);
    }
  }
})

export const { setNotifications, addNotification, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
