import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Post } from '../components/main/Post'
import { LeftList } from '../components/main/left/LeftList'
import { RightList } from '../components/main/right/RightList'


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
export function Container(props) {
    const classes = useStyles()
    return (
    <Grid container spacing ={3}>
        <Grid item xs className={classes.left} >
                <div style={{
                    position: 'fixed',
                    width: '23%', 
                    display: 'flex',
                    height: '100%'
                }} >
                    <LeftList />
                </div>
            </Grid>
            <Grid item xs={6} className={classes.mid} >
                <Post />
            </Grid>
            <Grid item xs className={classes.right} >
                <div style={{
                    position: 'fixed',
                    width: '23%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    height: '100%',
                }} >
                    <RightList />
                </div>
            </Grid>
    </Grid>)
}