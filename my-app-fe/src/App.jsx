import './App.css'
import FirstPage from './pages/FirstPage'
import {Routes, Route} from "react-router-dom"
import RegistrationPage from './pages/RegistrationPage'
import Home from './pages/Home'
function App() {

  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element = {<FirstPage />}/>
          <Route path="/register" element = {<RegistrationPage />}/>
          <Route path="/home" element = {<Home />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
