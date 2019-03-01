import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm';
import WalletForm from './components/walletForm';

export const ROUTE_HOME = '/'
export const ROUTE_WALLET = '/wallet'
class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path={ROUTE_HOME} component={LoginForm}/>
          <Route exact path={ROUTE_WALLET} component={WalletForm}/>
        </Switch>
      </div>
    )
  }
}

export default App
