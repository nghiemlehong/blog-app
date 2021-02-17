import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import srcImage from '../assets/blog.jpg'
import { Typography } from '@material-ui/core';
import { getToken, setToken } from '../utils/Common'
import { UserAPI } from '../api/userAPI'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    paddingTop: '30%', // 16:9
  },
}));

export function Banner(props) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [srcAvatar, setSrcAvatar] = useState('')


  useEffect(() => {
    const headers = { headers: { token: getToken() } }
    UserAPI.check(headers)
      .then(data => {
        setName(data.user.name)
        setSrcAvatar(data.user.avatar)
        setToken(data.user.token)
      })
      .catch(err => console.log(err))
  }, [])


  return (
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
          src={srcAvatar}
        >R</Avatar>
      </CardContent>
      <CardContent>
        <Typography style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '30px',
          marginBottom: '5px',
          textTransform : 'uppercase'

        }}>
          {name}
        </Typography>
        <Typography style={{
          textAlign: 'center',
        }}>
          🤣Anh ấy là người bí ẩn🤣
        </Typography>
      </CardContent>
    </Card>
  );
}
