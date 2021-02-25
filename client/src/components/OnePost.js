import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Comment } from '../components/container/Comment'
import { List, ListItem, Divider, InputLabel, ListItemAvatar, OutlinedInput, FormControl, InputAdornment, Chip } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { PostAPI } from '../api/postAPI'
import { getToken } from '../utils/Common'
import { useParams } from 'react-router-dom'
import { CommentAPI } from '../api/commentAPI'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { MyNotification } from '../notification/MyNotification'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { noTab } from '../redux/actions/valueTab'
import { useSpring, animated } from 'react-spring'
import { UserAPI } from '../api/userAPI'
import ReactHtmlParser from 'react-html-parser'
import CardActions from '@material-ui/core/CardActions';
import CommentIcon from '@material-ui/icons/Comment';
const useStyles = makeStyles((theme) => ({
    root: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export function OnePost(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [post, setPost] = useState({
        fans: [],
        comments: [],
        _id: '',
        content: '',
        mainContent: '',
        image: '',
        title: '',
        tag: { _id: '', name: '' },
        date: '',
        author: { _id: '', name: '', avatar: '' }
    })
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [like, setLike] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [checkPost, setCheckPost] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [showComment, setShowComment] = React.useState(false)
    const history = useHistory()

    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { id } = params
                const dataPost = await PostAPI.getOnePost(id)
                setPost(dataPost.post)
                setComments(dataPost.post.comments.reverse())
                const headers = { headers: { token: getToken() } }
                const dataUser = await UserAPI.check(headers)
                if (!user.error) {
                    setLike(checkLike(dataUser.user._id, dataPost.post.fans))
                    setCheckPost(checkPostId(id, dataUser.user.posts))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        dispatch(noTab())
    }, [params, dispatch, user.error])

    const checkLike = (_id, arr) => {
        for (let i of arr) if (i === _id) return true
        return false
    }

    const checkPostId = (_id, arr) => {
        for (let i of arr) if (i === _id) return true
        return false
    }

    const handleCreateComment = async () => {
        if (user.error || !getToken()) {
            MyNotification.like('INVALID_TOKEN')
            return
        }
        try {
            const headers = { headers: { token: getToken() } }
            let { id } = params
            const body = { idPost: id, content }
            const dataComment = await CommentAPI.createComment(headers, body)
            setComments([dataComment.comment, ...comments])
            setContent('')
        } catch (error) {
            console.log(error)
        }
    }

    const resetComments = async () => {
        try {
            let { id } = params
            const dataPost = await PostAPI.getOnePost(id)
            setComments(dataPost.post.comments.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = () => {
        if (user.error || !getToken()) {
            MyNotification.like('INVALID_TOKEN')
            return
        }
        const headers = { headers: { token: getToken() } }
        let { id } = params
        if (like) {
            setLike(!like)
            PostAPI.dislikePost(headers, id)
                .then(data => MyNotification.like('DISLIKE'))
                .catch(err => MyNotification.like(err.response.data.message))
        }
        if (!like) {
            setLike(!like)
            PostAPI.likePost(headers, id)
                .then(data => MyNotification.like('LIKE'))
                .catch(err => MyNotification.like(err.response.data.message))
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const updatePost = () => {
        let { id } = params
        history.push(`/updatePost/${id}`)
    }
    const animation = useSpring({
        opacity: 1,
        marginTop: '20px',
        zIndex: 1000,
        from: { opacity: 0, marginTop: '10px' },
    })

    const menuPost = () => {
        return (<>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {checkPost ?
                    <>
                        <MenuItem onClick={updatePost} >Chỉnh sửa bài viết</MenuItem>
                        <MenuItem onClick={handleClickOpen} >Xóa bài viết</MenuItem>
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
                    </> : ''}
                <MenuItem onClick={handleClose}>Báo cáo bài viết</MenuItem>
            </Menu>
        </>)
    }

    const handleConfirmDelete = async () => {
        try {
            const headers = { headers: { token: getToken() } }
            let { id } = params
            const dataDelete = await PostAPI.deletePost(headers, id)
            MyNotification.deletePost(dataDelete.success)
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    return (
        <animated.div style={animation} >
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}
                            src={post.author.avatar}
                        >
                            R
                    </Avatar>
                    }
                    action={
                        <>
                            <IconButton aria-label="settings" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            {menuPost()}
                        </>
                    }
                    title={post.author.name}
                    subheader={post.date}
                />
                <Divider/>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">

                        <div style={{ textAlign: 'center' }} >
                            {post.title}

                        </div>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Thể loại : <Chip label={post.tag.name} component="a" clickable />
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold' }}>
                        {post.mainContent}
                    </Typography>
                    <Typography>
                        {ReactHtmlParser(post.content)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleLike} variant='contained' color='primary' fullWidth >

                        {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}

                        Thích</Button>
                    <Button variant='contained' color='secondary' fullWidth
                        onClick={() => { 
                            if (user.error || !getToken()) {
                                MyNotification.like('INVALID_TOKEN')
                                return
                            }
                            setShowComment(!showComment)
                         }}
                    >
                        <CommentIcon />
                        Bình luận</Button>

                </CardActions>
                {showComment ? <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            src={user.user.avatar}
                        />
                    </ListItemAvatar>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Bình luận</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={handleCreateComment}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                            value={content}
                            onChange={evt => setContent(evt.target.value)}
                        />
                    </FormControl>
                </ListItem> : null}

                <Divider />
                <List>
                    {comments.map(comment => {
                        return (<div>
                            <Comment
                                author={comment.author}
                                content={comment.content}
                                id={comment._id}
                                reset={resetComments}
                            />
                            <Divider />
                        </div>)
                    })}
                </List>
            </Card>
        </animated.div>
    );
}
