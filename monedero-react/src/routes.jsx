import { LoginForm } from './components/LoginForm'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { WalletForm } from './components/WalletForm'

export const MonederoRoutes = () => 
  <Router>
      <Routes>
          <Route exact path="/" element={<LoginForm/>} />
          <Route exact path="/wallet" element={<WalletForm/>} />
      </Routes>
  </Router>
