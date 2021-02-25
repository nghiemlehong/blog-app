import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MyNotification } from '../../../notification/MyNotification'
import { getToken } from '../../../utils/Common'
import { PostAPI } from '../../../api/postAPI'
import { ListItemAvatar } from '@material-ui/core'
import { CommentAPI } from '../../../api/commentAPI'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll'
  },
}));




export function LeftList(props) {

  const classes = useStyles();
  const user = useSelector(state => state.user)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostAPI.getNewPost(5)
        setPosts(data.posts)
        const dataComments = await CommentAPI.getComment(5)
        setComments(dataComments.comments)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  let history = useHistory()
  const handleGoProfile = () => {
    if (user.error || !getToken()) {
      MyNotification.invalidToken()
      history.push('/login')
    }
    history.push('/personal/profile')
  }

  const ItemPost = ({ title, image, _id, author }) => {

    const goPost = () => { history.push(`/post/${_id}`) }
    return (
      <>
        <ListItem button onClick={goPost}>
          <ListItemAvatar>
            <Avatar variant="square" src={image} />
          </ListItemAvatar>
          <ListItemText primary={title} />
        </ListItem>
        <Divider />
      </>)
  }

  const ItemComment = ({ content, _id, author }) => {

    return (
      <>
        <ListItem >
          <ListItemAvatar>
            <Avatar variant="square" src={author.avatar} />
          </ListItemAvatar>
          <ListItemText primary={content} />
        </ListItem>
        <Divider />
      </>)
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={handleGoProfile} >
          <ListItemIcon>
            <Avatar alt="Travis Howard" src={user.user.avatar} />
          </ListItemIcon>
          <ListItemText primary={user.user.name} />
        </ListItem>
      </List>
      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Bài viết mới</b>
      </div>
      <List>
        {posts.map(post => (<ItemPost {...post} />))}
      </List>
      <div style={{ padding: '10px' }}>
        <b>Bình luận mới nhất</b>
      </div>
      {comments.map(comment => (<ItemComment {...comment} />))}

    </div>
  )
}