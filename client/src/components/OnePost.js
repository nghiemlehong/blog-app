import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import srcImage from '../assets/bg.jpg'
import {Comment} from '../components/container/Comment'
import {List,ListItem,Link,Divider,InputLabel,ListItemAvatar,OutlinedInput,FormControl,InputAdornment,Chip} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import {UserAPI} from '../api/userAPI'
import {getToken,setToken} from '../utils/Common'

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
    const [srcAvatar, setSrcAvatar] = useState('')
    useEffect(() => {
        UserAPI.check({ headers: { token: getToken() } })
            .then(data => {
                setSrcAvatar(data.user.avatar)
                setToken(data.user.token)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={srcImage}
                title="Paella dish"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                            Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                        Thể loại : <Chip label="Âm nhạc" component="a" clickable />
                    </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
            </CardContent>
            <Divider />

            <List>
                <Comment />
                <Comment />
                <Link color="inherit" style={{ margin: '10px' }}> Xem thêm</Link>
            </List>
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
    );
}
