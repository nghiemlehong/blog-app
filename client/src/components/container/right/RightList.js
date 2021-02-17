import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useHistory } from 'react-router-dom'
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
  const handleCreatePost = () => {
    history.push('/main/createPost')
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
    </div>
  );
}