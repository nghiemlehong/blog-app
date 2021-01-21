import React from 'react'
import './App.css';
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Switch, Route } from 'react-router-dom';
import { Main } from './pages/Main'
import {DetailedPost} from './pages/DetailedPost'
import {NotificationContainer} from 'react-notifications'
function App() {
  return (
    <div>
    <NotificationContainer/>
    <Switch>
      <Route path='/' component={Login} exact />
      <Route path='/signup' component={SignUp} />
      <Route path='/post' component={DetailedPost} />
      <Route path='/main' component={Main} />
    </Switch>
    </div>

  )
}

export default App; 
