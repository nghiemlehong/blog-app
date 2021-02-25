import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
//ar
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { getToken, setToken } from '../../utils/Common'
import { UserAPI } from '../../api/userAPI'
import { MyNotification } from '../../notification/MyNotification';
import { useDispatch } from 'react-redux'
import { getUser } from '../../redux/actions/user'
import { noTab } from '../../redux/actions/valueTab'
const useStyles = makeStyles((theme) => ({
    main: {
    },
    media: {
        paddingTop: '30%', // 16:9
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    heading: {
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 'bold',
        fontSize: '18px',

    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

}));


export function FormProfile(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [file, setFile] = useState(null)
    const [srcAvatar, setSrcAvatar] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPasword] = useState('')
    const dispatch = useDispatch()
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const handleUpdateNameAndEmail = async () => {
        try {
            const headers = { headers: { token: getToken() }, 'content-type': 'application/json', }
            let formData = new FormData()
            formData.append('email', email)
            formData.append('name', name)
            const data = await UserAPI.updateUser(formData, headers)
            MyNotification.updateUser(data.success)
            dispatch(getUser())
        } catch (error) {
            MyNotification.updateUser(error.response.data.message)
            console.log(error.response.data.message)

        }
    }

    const handleUpdateAvatar = async () => {
        try {
            const headers = { headers: { token: getToken() }, 'content-type': 'application/json', }
            let formData = new FormData()
            formData.append('file', file)
            const data = await UserAPI.updateAvatar(formData, headers)
            MyNotification.updateAvatar(data.success)
            dispatch(getUser())
        } catch (error) {
            MyNotification.updateAvatar(error.response.data.message)

        }
    }
    const handleUpdatePassword = async () => {
        try {
            const headers = { headers: { token: getToken() } }
            const body = { oldPassword, newPassword }
            const data = await UserAPI.updatePassword(body, headers)
            MyNotification.updatePassword(data.success)
            setNewPasword('')
            setOldPassword('')
        } catch (error) {
            MyNotification.updatePassword(error.response.data.message)

        }
    }

    useEffect(() => {
        dispatch(noTab())
        const headers = { headers: { token: getToken() } }
        UserAPI.check(headers)
            .then(data => {
                setName(data.user.name)
                setSrcAvatar(data.user.avatar)
                setEmail(data.user.email)
                setToken(data.user.token)
            })
            .catch(err => console.log(err))
    }, [dispatch])

    return (
        <Card>
            <CardContent>
                <Typography style={{
                }}>
                    <p style={{
                        marginRight: '20px',
                        fontWeight: 'bold',
                        fontSize: '20px',
                    }}>THÔNG TIN NGƯỜI DÙNG</p>
                </Typography>
                <Divider />
                <br />
                <div className={classes.root}>
                    <Accordion className={classes.main} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Họ tên :</Typography>
                            <Typography className={classes.secondaryHeading}>{name}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails style={{
                            display: 'flex',
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <TextField
                                id="filled-basic"
                                label="Thay đổi họ tên"
                                variant="outlined"
                                fullWidth
                                style={{
                                    margin: '10px 0 10px 0',
                                }}
                                value={name}
                                onChange={evt => setName(evt.target.value)}
                            />
                            <Button
                                disabled={!name.trim()}
                                variant='contained'
                                color="secondary"
                                style={{ margin: 'auto' }}
                                onClick={handleUpdateNameAndEmail}
                            >Cập nhật</Button>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.main} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={classes.heading}>Email :</Typography>
                            <Typography className={classes.secondaryHeading}>
                                {email}
                            </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails
                            style={{
                                display: 'flex',
                                padding: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TextField
                                id="filled-basic"
                                label="Thay đổi Email"
                                variant="outlined"
                                fullWidth
                                style={{
                                    margin: '10px 0 10px 0',
                                }}
                                value={email}
                                onChange={evt => setEmail(evt.target.value)}
                            />
                            <Button
                                variant='contained'
                                color="secondary"
                                style={{ margin: 'auto' }}
                                onClick={handleUpdateNameAndEmail}
                            >Cập nhật</Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.main} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography className={classes.heading}>Ảnh đại diện :</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <Box border={1} borderRadius="borderRadius" >
                                    <img alt='avatar' src={srcAvatar} width='150px' />
                                </Box>
                            </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                            <input type='file' onChange={evt => setFile(evt.target.files[0])} />
                            <Button
                                variant='contained'
                                color="secondary"
                                style={{ margin: 'auto' }}
                                onClick={handleUpdateAvatar}
                            >Cập nhật</Button>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.main} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography className={classes.heading}>Mật khẩu</Typography>
                            <Typography className={classes.secondaryHeading}>
                                ******************
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{
                            display: 'inline',
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <TextField
                                id="filled-basic"
                                label="Mật khẩu cũ"
                                variant="outlined"
                                fullWidth
                                type='password'
                                style={{
                                    margin: '10px 0 10px 0',
                                }}
                                value={oldPassword}
                                onChange={evt => setOldPassword(evt.target.value)}
                            />
                            <TextField
                                id="filled-basic"
                                label="Mật khẩu mới"
                                variant="outlined"
                                fullWidth
                                type='password'
                                style={{
                                    margin: '10px 0 10px 0',
                                }}
                                value={newPassword}
                                onChange={evt => setNewPasword(evt.target.value)}
                            />
                            <div
                                style={{
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    color="secondary"
                                    onClick={handleUpdatePassword}
                                >Cập nhật</Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    );
}
