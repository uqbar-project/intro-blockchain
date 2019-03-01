import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Form } from 'antd'
import { Login } from './components/login'

it('renders without crashing', () => {
  const div = document.createElement('div');
  //ReactDOM.render(<App />, div);

  const LoginForm = Form.create({ name: 'login' })(Login);
  ReactDOM.render(<Login />, div);
    
  ReactDOM.unmountComponentAtNode(div);
});
