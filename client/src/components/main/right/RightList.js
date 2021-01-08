import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import InboxIcon from '@material-ui/icons/Inbox'
import { MediaControlCard } from './Media'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function RightList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Viết bài" />
        </ListItem>
      </List>
      <Divider />
      <MediaControlCard />
      <Divider />
      <div style={{ padding: '10px' }}>
        <b>Liên hệ</b>
      </div>
      
      <Box

        style={{
          width: '100%',
          display: 'block',
          justifyContent: 'flex-end',
          height: '100%',
          overflowY: 'scroll',
          margin: '5px'
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Avatar variant='rounded' alt="Travis Howard" />
          </ListItemIcon>
          <ListItemText primary="Tên người dùng" />
        </ListItem>

      </Box>
    </div>
  );
}