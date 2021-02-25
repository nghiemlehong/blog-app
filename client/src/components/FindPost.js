import { Card, CardContent, Divider, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPost } from '../redux/actions/post'
import { ListItemPost } from './ListItemPost'
import { noTab } from '../redux/actions/valueTab'

export function FindPost(props) {
    const params = useParams()
    let { key } = params
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getAllPost())
        dispatch(noTab())
    }, [dispatch])

    const renderData = () => {
        console.log(posts.list.filter(post => post.title.indexOf(key) !== -1).length)
        if (posts.list.filter(post => post.title.indexOf(key) !== -1).length === 0)
            return (<h1>Không tìm thấy bài viết nào !</h1>)
        return posts.list.filter(post => post.title.indexOf(key) !== -1).map(post => {
            return (<ListItemPost {...post} />)
        })
    }
    return (
        <>
            <Card>
                <CardContent>
                    <Typography style={{
                    }}>
                        <p style={{
                            marginRight: '20px',
                            fontWeight: 'bold',
                            fontSize: '20px',
                        }}>TÌM KIẾM BÀI VIẾT</p>
                    </Typography>
                    <Divider />
                    <br />
                    {renderData()}
                </CardContent>
            </Card>
        </>
    )
}
