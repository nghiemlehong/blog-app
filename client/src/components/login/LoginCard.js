import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import image from '../../assets/blog.jpg'
import { useHistory } from 'react-router-dom'
//Login
import { UserAPI } from '../../api/userAPI'
import {setToken} from '../../utils/Common'
import {MyNotification} from '../../notification/MyNotification'
const useStyles = makeStyles({
    root: {
        marginTop: '10px',
        width: 600,
        padding: 5
    },
    media: {
        height: 140,
    },
})
export function LoginCard(props) {
    const classes = useStyles();

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    let history = useHistory()

    const handleSignUp = () => {
        history.push('/signup')
    }

    const handleLogin = () => {
        const body = { email, plainPassword: password }
        UserAPI.login(body)
            .then(data => {
                setToken(data.user.token)
                history.push('/main')
                MyNotification.login(data.success)
            })
            .catch(err => MyNotification.login(err.response.data.message))
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <b> ĐĂNG NHẬP</b>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    style={{ width: 500 }}
                    value={email}
                    onChange={evt => setEmail(evt.target.value)}
                />
                <FormControl variant="outlined" style={{ width: 500 }}>
                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(evt) => setPassword(evt.target.value)}
                        value={password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </CardActions>
            <CardActions
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button variant="contained" color="primary" disableElevation
                    onClick={handleLogin}
                >
                    ĐĂNG NHẬP
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSignUp}
                >
                    ĐĂNG KÝ
                </Button>
            </CardActions>
        </Card>
    )
}