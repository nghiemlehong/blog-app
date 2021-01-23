import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
//Card
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import srcImage from '../../assets/bg.jpg'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { Comment } from './Comment'
import { InputLabel, FormControl, OutlinedInput, InputAdornment, Avatar } from '@material-ui/core'
import { ListItem, ListItemAvatar, Chip } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import Badge from '@material-ui/core/Badge'
import Link from '@material-ui/core/Link'
import { UserAPI } from '../../api/userAPI'
import { getToken, setToken } from '../../utils/Common'
import {useHistory} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        },
        marginTop : '10px',
        marginBottom : "10px",
    },
}));
export function Post(props) {
    const classes = useStyles();

    const [like, setLike] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [srcAvatar, setSrcAvatar] = useState('')
    let history = useHistory()
    useEffect(() => {
        UserAPI.check({ headers: { token: getToken() } })
            .then(data => {
                setSrcAvatar(data.user.avatar)
                setToken(data.user.token)
            })
            .catch(err => console.log(err))
    }, [])


    const handleLike = () => {
        setLike(!like)
    }

    const handleShowComment = () => {
        setShowComment(!showComment)
    }

    const handleShowPost = ()=>{
        history.push('/post')
    }

    return (
        <div className={classes.root} >
            <Card>

                <CardActionArea onClick = {handleShowPost}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={srcImage}
                        title="Contemplative Reptile"
                    />  
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.date}
                         </Typography>

                        <Typography variant="body2" color="textSecondary" component="p"
                            style={{ fontWeight: 'bold' }}
                        >
                            {props.mainContent}
                         </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton onClick={handleLike}>
                        {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={handleShowComment} >
                        <Badge badgeContent={2} color="primary">
                            <CommentIcon />
                        </Badge>
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Tác giả :  <Chip avatar={<Avatar>N</Avatar>} label="Nghiệm"  />
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Thể loại : <Chip label="Âm nhạc" component="a" href="#chip" clickable />
                    </Typography>
                </CardActions>
                {showComment ?
                    <List>
                        <Comment />
                        <Comment />
                        <Link color="inherit" style={{ margin: '10px' }}> Xem thêm</Link>
                    </List>
                    : ''
                }
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            src={srcAvatar}
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
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </ListItem>


            </Card>
        </div>
    )
}