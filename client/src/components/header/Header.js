import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AdbIcon from '@material-ui/icons/Adb';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useHistory } from 'react-router-dom'
//TAB
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box'
//LOGOUT
import { removeToken, getToken, setToken } from '../../utils/Common'
//GET_INFO
import { UserAPI } from '../../api/userAPI'
import { Avatar } from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {handleLoading} from '../../redux/actions/loading'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#5E63FF',
    },
    grow: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [name, setName] = useState('')
    const [srcAvatar, setSrcAvatar] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        UserAPI.check({ headers: { token: getToken() } })
            .then(data => {
                setName(data.user.name)
                setToken(data.user.token)
                setSrcAvatar(data.user.avatar)
            })
            .catch(err => console.log(err))
    }, [])


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      
    };

    let history = useHistory()

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();

    };
    const goHome = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        history.push('/main/')
    }
    const goProfile = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        history.push('/main/profile')
    }

    const handleLogOut = () => {
        dispatch(handleLoading())
        history.push('/')
        removeToken()
        dispatch(handleLoading())
    }

    const handleMobileMenuOpen = (event) => {
       
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={goProfile}>Thông tin người dùng</MenuItem>
            <MenuItem onClick={handleLogOut} >Đăng xuất</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    return (
        <Box>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <AdbIcon />Blog
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Tìm kiếm trên blog..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor='secondary'
                        >
                            <Tab icon={<HomeIcon />} onClick={goHome} label="TRANG CHỦ" />
                            <Tab icon={<FavoriteIcon />} label="BÀI VIẾT ƯA THÍCH" />
                            <Tab icon={<AccountBoxIcon />} label="BÀI VIẾT CỦA BẠN" />
                        </Tabs>
                    </div>
                    {name}
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar
                                src = {srcAvatar}
                            />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
