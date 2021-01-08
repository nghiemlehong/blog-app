import React from 'react'
import { Header } from '../components/header/Header'
import Grid from '@material-ui/core/Grid'
import { Banner } from '../components/Banner'
import { FormProfile } from '../components/profile/FormProfile'
import { Footer } from '../components/footer/Footer'
import Button from '@material-ui/core/Button'

export function Profile(props) {
    return (<div>

        <Grid container spacing={3} >
            <Grid item xs={8} style={{ margin: 'auto' }} >
                <Banner />
            </Grid>
            <Grid item xs={8} style={{ margin: 'auto' }} >
                <FormProfile />
            </Grid>
            <Grid item xs={8} style={{ margin: 'auto' }}>
                <Footer />
            </Grid>
        </Grid>
       
    </div>)
}