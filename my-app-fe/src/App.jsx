import './App.css'
import FirstPage from './pages/FirstPage'
import {Routes, Route} from "react-router-dom"
import RegistrationPage from './pages/RegistrationPage'
import {THome} from './pages/THome'
import LogInPage from './pages/LogInPage'
function App() {

  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element = {<FirstPage />}/>
          <Route path="/register" element = {<RegistrationPage />}/>
          <Route path="/home" element = {<THome />}/>
          <Route path="/login" element = {<LogInPage />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
