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
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Divider } from '@material-ui/core'
import image from '../../assets/blog.jpg'
import { useHistory } from 'react-router-dom'
//Login
import { UserAPI } from '../../api/userAPI'
import { setToken } from '../../utils/Common'
import { MyNotification } from '../../notification/MyNotification'
import { useDispatch, useSelector } from 'react-redux'
import { handleLoading } from '../../redux/actions/loading'
import { useSpring, animated } from 'react-spring'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
        width: 400,
        padding: 5,
        backgroundColor: ' rgba(255, 255, 255, 0.7)',
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
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    let history = useHistory()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSignUp = () => {
        history.push('/signup')
    }

    const handleLogin = () => {
        const body = { email, plainPassword: password }
        dispatch(handleLoading())
        UserAPI.login(body)
            .then(data => {
                setToken(data.user.token)
                dispatch(handleLoading())
                history.push('/')
                MyNotification.login(data.success)
            })
            .catch(err => {
                MyNotification.login(err.response.data.message)
                dispatch(handleLoading())
            })
    }

    const goMainPage = () => { history.push('/') }
    const animation = useSpring({
        zIndex: 1000,
        opacity: 1,
        marginTop: '20px',
        from: { opacity: 0, marginTop: '5px' },
    })
    return (
        <animated.div style={animation} >
            <Card className={classes.root}>

                <CardActionArea >
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title="Contemplative Reptile"
                    />
                    <Divider />

                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{
                                textAlign: "center",
                                opacity: 1
                            }}
                        >
                             <b> ĐĂNG NHẬP</b>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                        fullWidth
                        disabled={loading}
                    />

                </CardActions>

                <CardActions>
                    <FormControl variant="outlined" fullWidth>
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
                            disabled={loading}
                        />
                    </FormControl>
                </CardActions>
                <CardActions>
                    <Button variant="contained" color="primary" disableElevation
                        disabled = {loading}
                        onClick={handleLogin} fullWidth size='large' 
                    >
                       {loading ? <CircularProgress /> : 'ĐĂNG NHẬP'}
                     </Button>
                </CardActions>
                <CardActions style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'end'
                    
                }} >
                    <a href='abc'  >Quên mật khẩu ?</a>
                </CardActions>
                <CardActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSignUp}
                        fullWidth
                        size='large'
                        disabled = {loading}
                    >
                        TẠO TÀI KHOẢN
                  </Button>
                </CardActions>
                <CardActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={goMainPage}
                        fullWidth
                        size='large'
                        disabled = {loading}

                    >
                        VỀ TRANG CHỦ
                  </Button>
                </CardActions>
                <Divider />
                <p
                    style={{
                        color: 'GrayText',
                        fontSize: '12px',
                        textAlign: 'center',
                    }}
                >
                    This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
                </p>
            </Card>
        </animated.div>

    )
}