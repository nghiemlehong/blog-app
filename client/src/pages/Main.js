import React from 'react'
import { Header } from '../components/header/Header'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import {Post} from '../components/main/Post'
import {LeftList} from '../components/main/left/LeftList'
import {RightList} from '../components/main/right/RightList'

const useStyles = makeStyles(theme => ({
    mid: {
        margin: 15,
    },
    left: {
    },
    right: {
       marginRight : '0px'
    },
    header : {
        marginTop : '5px'
    }
}))

export function Main(props) {
    const classes = useStyles()

    return (
        <div>
            
            <Grid container spacing={3}>
                <Grid item xs= {12} style = {{marginBottom : '50px'}}>
                    <div style = {{position : 'fixed' , zIndex : 1000, width : '100%'}}>
                        <Header/>
                    </div>
                </Grid>
                <Grid item xs className={classes.left} >
                    <div style={{
                        position: 'fixed',
                        height: '100%',
                        width : '23%',
                        display : 'flex',
                    }} >
                        <LeftList/>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.mid} >
                    <Post/>
                    <Post/>
                    <Post/>

                </Grid>
                <Grid item xs className={classes.right} >
                    <div   style={{
                        position: 'fixed',
                        height: '100%',
                        width : '23%',
                        display : 'flex',
                        justifyContent : 'flex-end'
                    }} >
                        <RightList/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}