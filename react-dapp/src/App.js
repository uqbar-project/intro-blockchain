import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm';
import WalletForm from './components/walletForm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginForm}/>
          <Route exact path="/wallet" component={WalletForm}/>
        </Switch>
      </div>
    )
  }
}

export default App
