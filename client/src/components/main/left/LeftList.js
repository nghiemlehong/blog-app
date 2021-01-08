import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import srcAvatar from '../../../assets/profile.jpg'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export function LeftList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <Avatar alt="Travis Howard" src={srcAvatar} />
          </ListItemIcon>
          <ListItemText primary="Lê Hồng Nghiệm" />
        </ListItem>
      </List>
      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Bài viết mới</b>
      </div>
      <div
        style={{
          overflowY: 'scroll',
          height: '200px',
          margin: '5px',
          padding: 0
        }}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <Avatar variant='rounded' alt="Travis Howard" />
            </ListItemIcon>
            <ListItemText primary="Tên biết bài" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar variant='rounded' alt="Travis Howard" />
            </ListItemIcon>
            <ListItemText primary="Tên biết bài" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar variant='rounded' alt="Travis Howard" />
            </ListItemIcon>
            <ListItemText primary="Tên biết bài" />
          </ListItem>
        </List>
      </div>

      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Bình luận nổi bật</b>
      </div>

      <div>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard"  >A</Avatar>
          </ListItemIcon>
          <ListItemText primary="Bình luận " />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard"   >B</Avatar>
          </ListItemIcon>
          <ListItemText primary="Bình luận " />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard"  >C</Avatar>
          </ListItemIcon>
          <ListItemText primary="Bình luận " />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard"  >D</Avatar>
          </ListItemIcon>
          <ListItemText primary="Bình luận " />
        </ListItem>
      </div>
      <Divider />

    </div>
  )
}