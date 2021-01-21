import React from 'react'
import { Grid } from '@material-ui/core'
import { Header } from '../components/header/Header'
import {OnePost} from '../components/OnePost'
export function DetailedPost(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: '50px' }}>
                <div style={{ position: 'fixed', zIndex: 1000, width: '100%' }}>
                    <Header />
                </div>
            </Grid>
            <Grid item xs={8} style={{margin: 'auto', marginTop: '10px' }}>
                <OnePost/>
            </Grid>
        </Grid>
    )
}