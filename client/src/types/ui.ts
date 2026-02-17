export interface UIState {
  mode: 'light' | 'dark',
  activeModal: null | 'tweet' | 'login' | 'profileEdit',
  isSidebarOpen: boolean,
  isLoading: boolean,
  activeTab: 'home' | 'explore' | 'notifications',
  toastMessage: string | null
}
