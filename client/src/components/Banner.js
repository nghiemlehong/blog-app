import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import srcImage from '../assets/bg.jpg'
import srcAvatar from '../assets/profile.jpg'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    paddingTop: '30%', // 16:9
  },
}));

export function Banner(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          fontWeight :'bold',
          fontSize : '30px',
          marginBottom : '5px'

        }}>
          LÊ HỒNG NGHIỆM
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
