import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import {FormUpdatePost} from './FormUpdatePost'
export function UpdatePost(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Grid container spacing={3} >
            
            <Grid item xs={8} style={{ margin: 'auto' }} >
                <FormUpdatePost/>
            </Grid>
        </Grid>)
}