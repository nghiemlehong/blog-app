import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
//Card
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'
import { Avatar } from '@material-ui/core'
import { Chip } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import { getToken } from '../../utils/Common'
import { useHistory } from 'react-router-dom'
import { PostAPI } from '../../api/postAPI'
import { MyNotification } from '../../notification/MyNotification'
import { useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        },
        marginTop: '20px',
        marginBottom: "10px",
    },
}));
export function Post(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const [like, setLike] = useState(false)
    let history = useHistory()
    useEffect(() => {
        console.log(user)
        if (getToken() || !user.error) {
            setLike(checkLike(user.user._id, props.fans))
        }
    }, [props.fans, user])

    const checkLike = (_id, arr) => {
        for (let i of arr) {
            if (i === _id) return true
        }
        return false
    }
    const handleLike = () => {
        if (user.error || !getToken()) {
            MyNotification.like('INVALID_TOKEN')
            return
        }
        const headers = { headers: { token: getToken() } }
        if (like) {
            setLike(!like)
            PostAPI.dislikePost(headers, props._id)
                .then(data => MyNotification.like('DISLIKE'))
                .catch(err => console.log(err))
        }
        if (!like) {
            setLike(!like)
            PostAPI.likePost(headers, props._id)
                .then(data => MyNotification.like('LIKE'))
                .catch(err => console.log(err))
        }
    }

    const handleShowPost = () => { 
        history.push(`/post/${props._id}`) 
    }

    const animation = useSpring({
        opacity: 1,
        marginTop: '20px',
        zIndex: 1000,
        from: { opacity: 0, marginTop: '50px' },
    })

    return (
        <animated.div style={animation} >
            <div className={classes.root} >
                <Card>

                    <CardActionArea onClick={handleShowPost}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={props.image}
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
                        <IconButton onClick={handleShowPost} >
                            <Badge badgeContent={props.comments.lenght} color="primary">
                                <CommentIcon />
                            </Badge>
                        </IconButton>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Tác giả :  <Chip avatar={<Avatar src={props.author.avatar} >N</Avatar>} label={props.author.name} />
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Thể loại : <Chip label={props.tag.name} component="a" href="#chip" clickable />
                        </Typography>
                    </CardActions>
                </Card>
            </div>
        </animated.div>
    )
}