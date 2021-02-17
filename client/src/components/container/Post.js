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
import {  Avatar } from '@material-ui/core'
import {  Chip } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import { UserAPI } from '../../api/userAPI'
import { getToken, setToken } from '../../utils/Common'
import { useHistory } from 'react-router-dom'
import { PostAPI } from '../../api/postAPI'
import { MyNotification } from '../../notification/MyNotification'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        },
        marginTop: '10px',
        marginBottom: "10px",
    },
}));
export function Post(props) {
    const classes = useStyles();
    const [like, setLike] = useState(false)
    let history = useHistory()
    useEffect(() => {
        UserAPI.check({ headers: { token: getToken() } })
            .then(data => {
                setToken(data.user.token)
                setLike(checkLike(data.user._id, props.fans))
            })
            .catch(err => console.log(err))

    }, [props.fans])

    const checkLike = (_id, arr) => {
       for(let i of arr){
           if(i===_id) return true
       }
        return false
    }
    const handleLike = () => {
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

    const handleShowPost = () => { history.push(`/main/post/${props._id}`) }

    return (
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
    )
}