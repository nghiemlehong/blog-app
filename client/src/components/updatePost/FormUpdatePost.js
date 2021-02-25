import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Select, Button, Box, CardHeader, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment'
import { MenuItem, InputLabel } from '@material-ui/core'
import { TagAPI } from '../../api/tagAPI'
import { PostAPI } from '../../api/postAPI'
import { MyNotification } from '../../notification/MyNotification'
import { getToken } from '../../utils/Common'
import { useParams, useHistory } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'
import { handleLoading } from '../../redux/actions/loading'

const useStyles = makeStyles((theme => ({
    input: {
        marginTop: '10px',
    },
    select: {
        marginBottom: '10px',
        marginTop: '10px',
    },
    box: {
        padding: 40,
        marginBottom: 10
    },
    formControl: {
        width: '100%'
    },
    button: {
        marginTop: 5,
    }

})))

export const FormUpdatePost = (props) => {
    const classes = useStyles()
    const [listTag, setListTag] = useState([])
    const [title, setTitle] = useState('')
    const [mainContent, setMainContent] = useState('')
    const [content, setContent] = useState('')
    const [idTag, setIdTag] = useState('')
    const [file, setFile] = useState(null)
    const [{ alt, src }, setImg] = useState({
        alt: 'Upload an Image',
        src: '',
    })
    const params = useParams()
    const getDay = () => {
        return moment().format('MMMM Do YYYY')
    }
    const history = useHistory()
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataTags = await TagAPI.getAllTag()
                setListTag(dataTags.tags)
                let { id } = params
                const dataPost = await PostAPI.getOnePost(id)
                setTitle(dataPost.post.title)
                setMainContent(dataPost.post.mainContent)
                setContent(dataPost.post.content)
                setIdTag(dataPost.post.tag._id)
                setImg({ src: dataPost.post.image })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [params])

    const renderTags = () => {
        return (listTag.map(tag =>
            (<MenuItem value={tag._id} >{tag.name}</MenuItem>)))
    }

    const handleUpdatePost = async () => {
        const headers = {
            headers: { token: getToken() },
            'content-type': 'application/json',
        }
        let { id } = params
        let formData = new FormData()
        formData.append("title", title)
        formData.append("mainContent", mainContent)
        formData.append("content", content)
        formData.append("idTag", idTag)
        let today = new Date()
        let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        console.log(date)
        formData.append("date", date)
        formData.append("file", file)
        dispatch(handleLoading())

        try {
            const data = await PostAPI.updatePost(headers, id, formData)
            MyNotification.updatePost(data.success)
            dispatch(handleLoading())
            history.push(`/post/${id}`)
        } catch (error) {
            MyNotification.updatePost(error.response.data.message)
            dispatch(handleLoading())

        }
    }



    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
            setFile(e.target.files[0])
        }
    }
    const animation = useSpring({
        opacity: 1,
        marginTop: '20px',
        zIndex: 1000,
        from: { opacity: 0, marginTop: '10px' },
    })

    return (
        <animated.div style={animation} >
            <Card>
                <CardHeader
                    avatar={
                        <CreateIcon />
                    }
                    title="VIẾT BÀI"
                    subheader={getDay()}
                />
                <Divider />
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.input}
                            id="standard-multiline-static"
                            label="Tiêu đề"
                            variant="outlined"
                            value={title}
                            onChange={evt => setTitle(evt.target.value)}
                            disabled={loading}
                        />
                        <TextField
                            className={classes.input}
                            id="standard-multiline-static"
                            label="Nội dung chính"
                            multiline
                            rows={3}
                            variant="outlined"
                            value={mainContent}
                            onChange={evt => setMainContent(evt.target.value)}
                            disabled={loading}

                        />


                        <Box className={classes.input} >
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data)
                                }}
                                disabled={loading}

                            />
                        </Box>

                        <FormControl variant="outlined" className={classes.select}>
                            <InputLabel>Nhãn</InputLabel>
                            <Select
                                label="Nhãn"
                                value={idTag}
                                onChange={evt => setIdTag(evt.target.value)}
                                disabled={loading}
                            >

                                {renderTags()}
                            </Select>
                        </FormControl>
                        <Box
                            className={classes.box}
                            border={1}
                            borderRadius={16}
                            style={{ borderStyle: 'solid', color: 'Gray' }}
                        >
                            <Grid container spacing={3} >
                                <Grid item xs={8} style={{ borderRight: 'solid 1px' }} >
                                    FILE ĐÍNH KÈM
                              <input
                                        type='file'
                                        onChange={handleImg}
                                        accept=".png, .jpg, .jpeg"
                                        disabled={loading}

                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <img width='100px' height='100px' alt={alt} src={src} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={handleUpdatePost}
                            disabled={loading}

                        >
                            CẬP NHẬT BÀI VIẾT
                        </Button>
                        <Button
                            color="secondary"
                            size="large"
                            variant="contained"
                            className={classes.button}
                            disabled={loading}

                        >
                            HỦY BỎ
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </animated.div>)
}