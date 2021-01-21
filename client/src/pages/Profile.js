import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Banner } from '../components/Banner'
import { FormProfile } from '../components/profile/FormProfile'
import { Footer } from '../components/footer/Footer'

export function Profile(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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