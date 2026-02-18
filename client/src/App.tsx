import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@scenes/homePage/index.js'
import LoginPage from '@scenes/loginPage/index.js';
import ProfilePage from '@scenes/profilePage/index.js';
import { useMemo } from "react"
import { useAppSelector } from '@hooks/useAppSelector.js';
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme.js"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const mode = useAppSelector((state => state.ui.mode))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const queryClient = new QueryClient();
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/profile/:userId" element={<ProfilePage />}></Route>
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
