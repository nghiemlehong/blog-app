import React from 'react'
import { Card, CardContent, Divider, List, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFavoritesList } from '../redux/actions/post'
import {ListItemPost} from './ListItemPost'
import { setValueTab } from '../redux/actions/valueTab'


export const FavoritesList = props => {
    const [count, setCount] = React.useState(2)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getFavoritesList(1))
        dispatch(setValueTab(1))
    }, [dispatch])

    const fetchMoreData = () => {
        dispatch(getFavoritesList(count))
        setCount(count + 1)
    };

    return (
        <Card>
            <CardContent>
                <Typography style={{
                }}>
                    <p style={{
                        marginRight: '20px',
                        fontWeight: 'bold',
                        fontSize: '20px',
                    }}>BÀI VIẾT ƯA THÍCH</p>
                </Typography>
                <Divider />
                <br />
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
                        <List>
                            {posts.list.map(post => {
                                return (<ListItemPost {...post} />)
                            })}
                        </List>

                    </InfiniteScroll>

                }
            </CardContent>
        </Card>)
}