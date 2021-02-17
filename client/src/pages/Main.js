import React from 'react'
import { Header } from '../components/header/Header'
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom'
import { Container } from '../components/Container'
import { Profile } from '../components/Profile'
import { DetailedPost } from '../components/DetailedPost'
import { CreatePost } from '../components/createPost/CreatePost'
import {UpdatePost} from '../components/updatePost/UpdatePost'
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
                    <Route path="/main/" exact component={Container} />
                    <Route path="/main/profile" component={Profile} />
                    <Route path="/main/post/:id" component={DetailedPost} />
                    <Route path="/main/createPost" component={CreatePost} />
                    <Route path="/main/updatePost/:id" component={UpdatePost} />


                </Switch>
            </Grid>

        </Grid>

    </div>

    )
}