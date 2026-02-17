import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../types/ui';

const initialState = {
  mode: 'light',
  activeModal: null,
  isSidebarOpen: true,
  isLoading: true,
  activeTab: 'home',
  toastMessage: null
} satisfies UIState as UIState;

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setActiveModal: (state, action: PayloadAction<{ modal: UIState['activeModal'] }>) => {
      state.activeModal = action.payload.modal;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setActiveTab: (state, action: PayloadAction<{ tab: UIState['activeTab'] }>) => {
      state.activeTab = action.payload.tab;
    },
    setToastMessage: (state, action: PayloadAction<{ message: string | null }>) => {
      state.toastMessage = action.payload.message;
    }
  }
})

export const { toggleTheme, setActiveModal, toggleSidebar, setLoading, setActiveTab, setToastMessage } = uiSlice.actions;
export default uiSlice.reducer;
