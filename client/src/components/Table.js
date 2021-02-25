import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CardContent, Card, Button, Typography, Divider } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getPostByIdUser } from '../redux/actions/post'
import { useHistory } from 'react-router-dom'
import { PostAPI } from '../api/postAPI'
import { getToken } from '../utils/Common'
import { MyNotification } from '../notification/MyNotification'
import {setValueTab} from '../redux/actions/valueTab'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    head: {
        fontWeight: 'bold',
        fontSize: '20px'

    },
    body: {},
    button: {
        margin: '2px 2px 2px 2px',
    },
    title: {
        fontSize: '20px',
        margin: '10px 10px 10px 10px'
    }

});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export function TablePost() {
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelte] = React.useState('')
    const classes = useStyles()
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    React.useEffect(() => {
        dispatch(getPostByIdUser())
        dispatch(setValueTab(2))
    }, [dispatch])
    const updatePost = (id) => {
        history.push(`/updatePost/${id}`)
    }
    const handleOpen = (id) => {
        setOpen(true)
        setIdDelte(id)
    }
    const handleClose = () => {
        setOpen(false);
    }
    const deletePost = async (id) => {
        try {
            const headers = { headers: { token: getToken() } }
            const dataDelete = await PostAPI.deletePost(headers, id)
            MyNotification.deletePost(dataDelete.success)
            dispatch(getPostByIdUser())
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle >{"THÔNG BÁO"}</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn muốn xóa bài viết ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary">
                        HỦY
                    </Button>
                    <Button onClick={() => deletePost(idDelete)} variant="contained" color="primary">
                        ĐỒNG Ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Card>
                <CardContent>
                    <Typography style={{
                    }}>
                        <p style={{
                            marginRight: '20px',
                            fontWeight: 'bold',
                            fontSize: '20px',
                        }}>BÀI VIẾT CỦA BẠN</p>
                    </Typography>
                    <Divider />
                    <br />
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell className={classes.head} >STT</TableCell>
                                    <TableCell className={classes.head} align="right">TIÊU ĐỀ</TableCell>
                                    <TableCell className={classes.head} align="right">NỘI DUNG CHÍNH</TableCell>
                                    <TableCell className={classes.head} align="right">NHÃN</TableCell>
                                    <TableCell className={classes.head} align="right">HIỆU CHỈNH</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.list.map((row, index) => (
                                    <TableRow key={row.author.name}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="right">{row.title}</TableCell>
                                        <TableCell align="right">{row.mainContent}</TableCell>
                                        <TableCell align="right">{row.tag.name}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => updatePost(row._id)}
                                            >Chỉnh sửa</Button>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleOpen(row._id)}
                                            >Xóa</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>


    );
}
