import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
export function ListItemPost({ author, title, mainContent, _id, tag }) {

    const history = useHistory()

    const goPost = () => { history.push(`/post/${_id}`) }

    return (
        <>
            <ListItem button onClick={goPost}>
                <ListItemAvatar>
                    <Avatar src={author.avatar} />
                </ListItemAvatar>
                <ListItemText primary={title} secondary={mainContent} />
            </ListItem>
            <Divider />
        </>
    )
}
