import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Banner } from './Banner'
import { FormProfile } from './profile/FormProfile'
import { TablePost } from './Table'
import { FavoritesList } from './FavoritesList'
import { Switch, Route } from 'react-router-dom'
export function Personal(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (<div>

        <Grid container spacing={3} >
            <Grid item xs={8} style={{ margin: 'auto' }} >
                <Banner />
            </Grid>
            <Grid item xs={8} style={{ margin: 'auto' }} >
                <Switch>
                    <Route path="/personal/profile" component={FormProfile} />
                    <Route path="/personal/yourPost" component={TablePost} />
                    <Route path="/personal/favoritesList" component={FavoritesList} />
                </Switch>
            </Grid>
        </Grid>

    </div>)
}