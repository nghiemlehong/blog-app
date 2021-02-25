import React from 'react'
import './App.css';
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Switch } from 'react-router-dom';
import { Main } from './pages/Main'
import { NotificationContainer } from 'react-notifications'
import { PublicRoute } from './routes/PublicRoute'
import { Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <NotificationContainer />
      <Switch>
        <PublicRoute path='/login' component={Login} exact />
        <PublicRoute path='/signup' component={SignUp} />
        <Route path='/' component={Main} />
      </Switch>

    </div>

  )
}

export default App; 
