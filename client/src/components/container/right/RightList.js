import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useHistory } from 'react-router-dom'
import { getToken } from '../../../utils/Common'
import { MyNotification } from '../../../notification/MyNotification'
import { useSelector } from 'react-redux'
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function RightList(props) {
  const classes = useStyles();
  const history = useHistory()
  const user = useSelector(state => state.user)
  const handleCreatePost = () => {
    if (user.error || !getToken()) {
      MyNotification.createPost('INVALID_TOKEN')
      history.push('/login')
    }
    history.push('/createPost')
  }
  return (
    <div className={classes.root}>
      <List>
        <ListItem button onClick={handleCreatePost} >
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary='Viết bài' />
        </ListItem>
      </List>
      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Liên hệ</b>
      </div>
      <a href="https://www.facebook.com/nghiem.lehong/" >
        <ListItem button >
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary='Facebook' />
        </ListItem>
      </a>
      <a href="https://github.com/nghiemlehong" >
        <ListItem button >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary='Github' />
        </ListItem>
      </a>
      <a href="https://www.linkedin.com/in/nghi%E1%BB%87m-l%C3%AA-043545170/" >
        <ListItem button >
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText primary='Linked In' />
        </ListItem>
      </a>
      <CopyToClipboard text="nghiemlehong98@gmail.com" onCopy={() => { MyNotification.coppied() }} >
        <ListItem button >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary='Gmail' />
        </ListItem>
      </CopyToClipboard>
    </div>
  );
}