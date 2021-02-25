import React, { useEffect } from 'react';
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
import { useHistory } from 'react-router-dom'
//TAB
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
//LOGOUT
import { getToken, removeToken } from '../../utils/Common'
//GET_INFO
import { Avatar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { handleLoading } from '../../redux/actions/loading'
import { getUser, removeUser } from '../../redux/actions/user'
import { setValueTab } from '../../redux/actions/valueTab'
import { LinearProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
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
    icon: {
        marginRight: 5,
    }
}));

export function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [input, setInput] = React.useState('')
    const isMenuOpen = Boolean(anchorEl);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const valueTab = useSelector(state => state.valueTab)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        if (getToken()) dispatch(getUser())
    }, [dispatch])


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
        history.push('/')
    }
    const goProfile = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        history.push('/personal/profile')
    }
    const goYourPost = () => {
        setAnchorEl(null)
        history.push('/personal/yourPost')
    }
    const goFavoritesList = () => {
        history.push('/personal/favoritesList')
    }

    const handleLogOut = () => {
        dispatch(handleLoading())
        history.push('/')
        removeToken()
        dispatch(removeUser())
        dispatch(handleLoading())
        setAnchorEl(null)
    }

    const handleCreatePost = () => {
        history.push('/createPost')
        setAnchorEl(null)
    }

    const handleMobileMenuOpen = (event) => {

    };

    const goLogin = () => { history.push('/login') }
    const goSignUp = () => { history.push('/signup') }


    const handleChange = (event, newValue) => {
        dispatch(setValueTab(newValue))
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
            {user.error || !getToken() ?
                <>
                    <MenuItem onClick={goLogin}>
                        <LockIcon className={classes.icon} /> Đăng nhập
                    </MenuItem>
                    <MenuItem onClick={goSignUp} >
                        <AddBoxOutlinedIcon className={classes.icon} /> Đăng ký
                    </MenuItem>
                </>
                :
                <>
                    <MenuItem onClick={goProfile}>
                        <AccountCircleIcon className={classes.icon} />Thông tin người dùng
                    </MenuItem>
                    <MenuItem onClick={handleCreatePost} >
                        <CreateIcon className={classes.icon} />Viết bài
                    </MenuItem>
                    <MenuItem onClick={handleLogOut} >
                        <ExitToAppIcon className={classes.icon} /> Đăng xuất
                    </MenuItem>
                </>}

        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const handleFindPost = () => {
        history.push(`/findPost/${input}`)
    }
    return (
        <Box>
            {console.log(user)}
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <AdbIcon />Blog
                    </Typography>
                    <div className={classes.search}>
                        <form>
                            <IconButton
                                disabled={!input.trim()}
                                type='submit'
                                onClick={handleFindPost}
                                className={classes.searchIcon}>
                                <SearchIcon color='light' />
                            </IconButton>
                            <InputBase
                                placeholder="Tìm kiếm trên blog..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={input}
                                onChange={evt => setInput(evt.target.value)}
                            />
                        </form>

                    </div>
                    <div className={classes.grow} >
                        <Tabs
                            value={valueTab}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor='secondary'
                        >
                            <Tab icon={<HomeIcon />} onClick={goHome} label="TRANG CHỦ" />
                            <Tab disabled={user.error || !getToken()} icon={<FavoriteIcon />} onClick={goFavoritesList} label="BÀI VIẾT ƯA THÍCH" />
                            <Tab disabled={user.error || !getToken()} icon={<AccountBoxIcon />} onClick={goYourPost} label="BÀI VIẾT CỦA BẠN" />
                        </Tabs>
                    </div>
                    {user.user.name}
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
                                src={user.user.avatar}
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
            <div>
                {loading ? <LinearProgress color = "secondary" /> : ''}
            </div>
        </Box>
    );
}
