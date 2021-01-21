import React from 'react'
import { Header } from '../components/header/Header'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route } from 'react-router-dom'
import { Container } from './Container'
import { Profile } from './Profile'
const useStyles = makeStyles(theme => ({
    mid: {
        margin: 15,
    },
    left: {
    },
    right: {

    },
    header: {
        marginTop: '5px'
    }
}))

export function Main(props) {
    const classes = useStyles()

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
                </Switch>
            </Grid>

        </Grid>

    </div>

    )
}