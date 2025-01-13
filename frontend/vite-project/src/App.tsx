
import './App.css'







import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CardWithForm as RegisterForm } from "./components/auth/register-form"
import { CardWithForm as LoginForm } from "./components/auth/login-form"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<RegisterForm />} />
      </Routes>
    </Router>
  )
}

export default App
