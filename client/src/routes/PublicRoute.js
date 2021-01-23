import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {getToken} from '../utils/Common'

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (getToken()  ? <Redirect to="/main" /> :
     <Component {...props} />)} />
)