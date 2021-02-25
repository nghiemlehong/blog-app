import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import image from '../../assets/blog.jpg'
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box, Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { UserAPI } from '../../api/userAPI'
import { MyNotification } from '../../notification/MyNotification'
import { useSpring, animated } from 'react-spring'
import { handleLoading } from '../../redux/actions/loading'
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    root: {
        marginTop: '20px',
        width: 400,
        padding: 5,
        backgroundColor: ' rgba(255, 255, 255, 0.7)'

    },
    media: {
        height: 140,
    },
    input: {
        width: '585px',
        marginTop: '10px',
    }
})

export function SignUpCard(props) {
    const classes = useStyles();
    let history = useHistory()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [file, setFile] = useState(null)
    const [email, setEmail] = useState('')
    const [plainPassword, setPlainPassword] = useState('')
    const [confirmPlainPassword, setConfirmPlainPassword] = useState('')
    const [name, setName] = useState('')
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    const handleSignUp = () => {
        const headers = { 'content-type': 'application/json', }
        let formData = new FormData()
        formData.append('file', file)
        formData.append('email', email)
        formData.append('plainPassword', plainPassword)
        formData.append('name', name)
        dispatch(handleLoading())
        UserAPI.signUp(formData, headers)
            .then(data => {
                dispatch(handleLoading())
                MyNotification.signup(data.success)
                history.push('/login')
            })
            .catch(err => {
                dispatch(handleLoading())
                MyNotification.signup(err.response.data.message)
            })
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleBack = () => {
        history.push('/login')
    }
    const animation = useSpring({
        opacity: 1,
        marginTop: '20px',
        zIndex: 1000,
        from: { opacity: 0, marginTop: '10px' },
    })

    return (
        <animated.div style={animation} >
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
                                fontWeight: 'bold',
                            }}
                        >
                            ĐĂNG KÝ TÀI KHOẢN
                    </Typography>
                        <Typography
                            style={{
                                color: 'red',
                                textAlign: 'center',

                            }}
                        >
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <TextField
                        label="Email"
                        variant="outlined"
                        className={classes.input}
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                        disabled={loading}
                    />
                </CardActions>
                <CardActions>
                    <TextField
                        label="Họ tên"
                        variant="outlined"
                        className={classes.input}
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                        disabled={loading}
                    />
                </CardActions>
                <CardActions>
                    <FormControl variant="outlined"
                        className={classes.input}>
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={plainPassword}
                            onChange={evt => setPlainPassword(evt.target.value)}
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
                    <FormControl variant="outlined"
                        className={classes.input}>
                        <InputLabel htmlFor="outlined-adornment-password">Nhập lại mật khẩu </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPlainPassword}
                            onChange={evt => setConfirmPlainPassword(evt.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={handleClickShowConfirmPassword}
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={130}
                            disabled={loading}
                        />
                    </FormControl>
                </CardActions>
                <CardActions>
                    <Box
                        className={classes.input}
                        border={1}
                        borderRadius={5}
                        style={{
                            color: 'GrayText',
                            height: '100px'
                        }}> Ảnh đại diện
                    <input type='file'
                            onChange={evt => setFile(evt.target.files[0])}
                            disabled={loading}
                        />
                    </Box>
                </CardActions>
                <CardActions >
                    <Button
                        variant="contained" color="primary" disableElevation
                        onClick={handleSignUp}
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress /> : 'TẠO TÀI KHOẢN'}
                    </Button>
                </CardActions>
                <CardActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack}
                        fullWidth
                        disabled={loading}
                    >
                        QUAY LẠI
                    </Button>
                </CardActions>
                <Divider />
                <p style={{
                    color: 'Gray',
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