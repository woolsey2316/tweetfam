import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMmeo } from "react"
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider} from "@mui/material"
import { createtheme } from "@mui/material/styles"
import { themeSettings } from "./theme"

function App() {
  const mode = useSelector((state => state.mode))
  const theme = useMmeo(() => createtheme(themeSettings(mode)), [mode])
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
