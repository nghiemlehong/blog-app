import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Post } from '../components/container/Post'
import { LeftList } from '../components/container/left/LeftList'
import { RightList } from '../components/container/right/RightList'
import { CreatePost } from '../components/container/CreatePost'
import { getAllPost } from '../redux/actions/post'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: '5px'
    }
}))
export function Container(props) {
    const classes = useStyles()
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPost())
    }, [])
   
    return (
        <Grid container spacing={3}>
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
                <CreatePost />
                {posts.map(post=><Post {...post}/>)}
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