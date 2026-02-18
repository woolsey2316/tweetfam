import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@scenes/homePage/index.js'
import LoginPage from '@scenes/loginPage/index.js';
import ProfilePage from '@scenes/profilePage/index.js';
import { useMemo } from "react"
import { useAppSelector } from '@hooks/useAppSelector.js';
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme.js"

function App() {
  const mode = useAppSelector((state => state.ui.mode))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
