import { LoginForm } from './components/LoginForm'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { WalletForm } from './components/WalletForm'

export const MonederoRoutes = () => (
  <Router>
      <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/wallet" component={WalletForm} />
      </Switch>
  </Router>
)