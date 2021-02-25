import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import srcImage from '../assets/blog.jpg'
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    paddingTop: '30%', // 16:9
  },
}));

export function Banner(props) {
  const classes = useStyles();
  const user = useSelector(state => state.user.user)
  const animation = useSpring({
    opacity: 1,
    marginTop: '20px',
    zIndex: 1000,
    from: { opacity: 0, marginTop: '10px' },
  })
  return (
    <animated.div style={animation} >
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={srcImage}
          title="Paella dish"
        />
        <CardContent
          style={{
            display: ' flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            style={{
              width: '150px',
              height: '150px',
              marginTop: "-100px",
            }}
            src={user.avatar}
          >R</Avatar>
        </CardContent>
        <CardContent>
          <Typography style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '30px',
            marginBottom: '5px',
            textTransform: 'uppercase'

          }}>
            {user.name}
          </Typography>
          <Typography style={{
            textAlign: 'center',
          }}>
            🤣Anh ấy là người bí ẩn🤣
        </Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
}
