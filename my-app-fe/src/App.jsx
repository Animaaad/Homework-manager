import './App.css'
import FirstPage from './pages/FirstPage'
import {Routes, Route} from "react-router-dom"
import RegistrationPage from './pages/RegistrationPage'
import {Home} from './pages/Home'
import TLogInPage from './pages/TLoginPage'
import LogInPage from './pages/LogInPage'
function App() {

  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element = {<FirstPage />}/>
          <Route path="/register" element = {<RegistrationPage />}/>
          <Route path="/home" element = {<Home />}/>
          <Route path="/login" element = {<LogInPage />}/>
          <Route path="/tlogin" element = {<TLogInPage />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
