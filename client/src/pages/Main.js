import React from 'react'
import { Header } from '../components/header/Header'
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom'
import { Container } from '../components/Container'
import { DetailedPost } from '../components/DetailedPost'
import { CreatePost } from '../components/createPost/CreatePost'
import { UpdatePost } from '../components/updatePost/UpdatePost'
import { Personal } from '../components/Personal'
import { FindPost } from '../components/FindPost'
import {PrivateRoute} from '../routes/PrivateRoute'
export function Main(props) {

    return (<div>
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: '50px' }}>
                <div style={{ position: 'fixed', zIndex: 1000, width: '100%' }}>
                    <Header />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Switch>
                    <Route path="/" exact component={Container} />
                    <Route path="/post/:id" component={DetailedPost} />
                    <PrivateRoute path="/createPost" component={CreatePost} />
                    <PrivateRoute path="/updatePost/:id" component={UpdatePost} />
                    <PrivateRoute path="/personal" component={Personal} />
                    <Route path="/findPost/:key" component={FindPost} />
                </Switch>
            </Grid>

        </Grid>

    </div>

    )
}