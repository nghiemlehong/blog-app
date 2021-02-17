import React, { useEffect } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Menu, MenuItem } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import { UserAPI } from '../../api/userAPI'
import { getToken } from '../../utils/Common'
import { CommentAPI } from '../../api/commentAPI'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle';
export function Comment(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [update, setUpdate] = React.useState(false)
    const [commentUpdate, setCommentUpdate] = React.useState('')
    const [checkRole, setCheckRole] = React.useState(false)
    const [content, setContent] = React.useState('')
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const headers = { headers: { token: getToken() } }
                const dataUser = await UserAPI.check(headers)
                console.log(props.author._id)
                if (dataUser.user._id === props.author._id) setCheckRole(true)
            } catch (error) {
                console.log(error)
            }
        }
        checkUser()
        setContent(props.content)

    }, [props.author._id, props.content])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateComment = () => {
        setAnchorEl(null)
        setUpdate(!update)
        setCommentUpdate(content)
    }
    const handleCancelUpdate = () => {
        setUpdate(false)
    }
    const handleConfirmUpdate = async () => {
        try {
            const headers = { headers: { token: getToken() } }
            const body = { content: commentUpdate }
            const data = await CommentAPI.updateComment(headers, body, props.id)
            setUpdate(false)
            setContent(data.comment.content)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    const handleClickClose = () => {
        setOpen(false);
    };
    const handleConfirmDelete = async()=>{
        try {
            const headers = { headers: { token: getToken() } }
            await CommentAPI.deleteComment(headers, props.id)
            setOpen(false)
            props.reset()
            
        } catch (error) {
            console.log(error.response.data.message)
        }

    }



    const formUpdateComment = () => {
        return (<>
            <TextField
                id="standard-basic"
                fullWidth
                value={commentUpdate}
                onChange={evt => setCommentUpdate(evt.target.value)}
            />

            <Button
                style={{ marginTop: '10px' }}
                variant="contained"
                color="primary"
                onClick={handleConfirmUpdate}
            >CẬP NHẬT</Button>
            <Button
                style={{ marginTop: '10px', marginLeft: '10px' }}
                variant="contained"
                color="secondary"
                onClick={handleCancelUpdate}
            >HỦY</Button>

        </>)
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    src={props.author.avatar}
                >
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.author.name}
                secondary={
                    <React.Fragment>
                        {update ?
                            formUpdateComment()
                            :
                            content
                        }
                    </React.Fragment>
                } />



            <ListItemIcon  >
                {update ? '' :
                    <IconButton onClick={handleClick} >
                        <MoreVertIcon />
                    </IconButton>}

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {checkRole ?
                        <> <MenuItem onClick={handleUpdateComment}>Chỉnh sửa bình luận</MenuItem>
                            <MenuItem onClick={handleClickOpen}>Xóa bình luận</MenuItem>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">THÔNG BÁO</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Bạn muốn xóa bình luận ?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickClose} color="primary">
                                        HỦY BỎ
                                    </Button>
                                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                                        ĐỒNG Ý
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </> : ''
                    }
                    <MenuItem onClick={handleClose}>Báo cáo bình luận</MenuItem>

                </Menu>
            </ListItemIcon>
        </ListItem>
    )
}