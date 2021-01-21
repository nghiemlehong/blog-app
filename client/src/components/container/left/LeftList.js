import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from 'react-router-dom'
import { UserAPI } from '../../../api/userAPI'
import { getToken, setToken } from '../../../utils/Common'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export function LeftList(props) {

  const classes = useStyles();
  const [srcAvatar, setSrcAvatar] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    UserAPI.check({ headers: { token: getToken() } })
      .then(data => {
        setName(data.user.name)
        setSrcAvatar(data.user.avatar)
        setToken(data.user.token)
      })
      .catch(err => console.log(err))
  }, [])


  let history = useHistory()
  const handleGoProfile = () => {
    history.push('/main/profile')
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick = {handleGoProfile} >
          <ListItemIcon>
            <Avatar alt="Travis Howard" src={srcAvatar} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </List>
      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Bài viết mới</b>
      </div>
      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Bình luận nổi bật</b>
      </div>

    </div>
  )
}