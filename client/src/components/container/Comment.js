import React from 'react'
import { ListItem, ListItemAvatar, Avatar,ListItemText } from '@material-ui/core'
export function Comment(props) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014"  />
        </ListItem>
    )
}