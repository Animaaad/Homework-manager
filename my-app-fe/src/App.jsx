import './App.css'
import FirstPage from './pages/FirstPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage'
import { THome } from './pages/THome'
import LogInPage from './pages/LogInPage'
import { useState } from 'react'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { useEffect } from 'react';
import { getCurrentUser } from './services/authService';
function App() {
  const [error, setError] = useState('');
  const [authStatus, setAuthStatus] = useState(false);
  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setAuthStatus(true);
        //props.setUser(data.user); // Optional: if you're tracking user info
      })
      .catch(() => {
        setAuthStatus(false);
      });
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Header
          authStatus={authStatus} setAuthStatus={setAuthStatus} setError={setError} error={error} />
        <Routes>
          <Route path="/" element={<FirstPage
           authStatus={authStatus} setAuthStatus={setAuthStatus}/>} />
          <Route path="/register" element={<RegistrationPage 
          authStatus={authStatus} setAuthStatus={setAuthStatus}/>} />
          <Route path="/thome" element={<THome
            error={error} setError={setError} authStatus={authStatus} setAuthStatus={setAuthStatus} />} />
          <Route path="/home" element={<Home
            error={error} setError={setError} authStatus={authStatus} setAuthStatus={setAuthStatus} />} />
          <Route path="/login"
            element={<LogInPage error={error} setError={setError} setAuthStatus={setAuthStatus} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
