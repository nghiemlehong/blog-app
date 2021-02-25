import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Post } from './container/Post'
import { LeftList } from './container/left/LeftList'
import { RightList } from './container/right/RightList'
import { pagination } from '../redux/actions/post'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component';
import { setValueTab } from '../redux/actions/valueTab'
const useStyles = makeStyles(theme => ({
    header: {
        marginTop: '5px'
    }
}))

export function Container(props) {
    const classes = useStyles()
    const posts = useSelector(state => state.posts)
    const [count, setCount] = React.useState(2)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pagination(1))
        dispatch(setValueTab(0))
    }, [dispatch])


    const fetchMoreData = () => {
        dispatch(pagination(count))
        setCount(count + 1)
        console.log(count)
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs className={classes.left} >
                <div style={{
                    position: 'fixed',
                    width: '23%',
                    display: 'flex',
                    height: '100vh'
                }} >
                <LeftList />
                  
                </div>
            </Grid>
            <Grid item xs={6} className={classes.mid} >

                {posts.loading ?
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10px'
                        }}
                    >
                        <CircularProgress />
                    </div> :
                    <InfiniteScroll
                        dataLength={posts.list.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<h4>Loading....</h4>}
                    >
                        {posts.list.map(post => {
                            return (<Post {...post} />)
                        })}
                    </InfiniteScroll>

                }

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