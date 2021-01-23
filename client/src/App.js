import React from 'react'
import './App.css';
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Switch, Route } from 'react-router-dom';
import { Main } from './pages/Main'
import {DetailedPost} from './pages/DetailedPost'
import {NotificationContainer} from 'react-notifications'
import {PrivateRoute} from './routes/PrivateRoute'
import {PublicRoute} from './routes/PublicRoute'
import {LinearProgress }from '@material-ui/core'
import {useSelector} from 'react-redux'
function App() {
  const loading = useSelector(state => state.loading)
  return (
    <div>
    {loading? <LinearProgress/> : ''}
    <NotificationContainer/>
    <Switch>
      <PublicRoute path='/' component={Login} exact />
      <PublicRoute path='/signup' component={SignUp} />
      <PrivateRoute path='/post' component={DetailedPost} />
      <PrivateRoute path='/main' component={Main} />
    </Switch>
    </div>

  )
}

export default App; 
