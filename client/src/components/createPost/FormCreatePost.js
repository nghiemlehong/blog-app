import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Select, Button, Box, CardHeader, Divider } from '@material-ui/core';
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
import { noTab } from '../../redux/actions/valueTab'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { useHistory } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

})))

export const FormCreatePost = (props) => {
    const classes = useStyles()
    const [listTag, setListTag] = useState([])
    const [title, setTitle] = useState('')
    const [mainContent, setMainContent] = useState('')
    const [content, setContent] = useState('')
    const [idTag, setIdTag] = useState('')
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const getDay = () => {
        return moment().format('MMMM Do YYYY')
    }
    const history = useHistory()
    useEffect(() => {
        const fetchDataTags = async () => {
            try {
                const data = await TagAPI.getAllTag()
                setListTag(data.tags)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataTags()
        dispatch(noTab())
    }, [dispatch])

    const renderTags = () => {
        return (listTag.map(tag =>
            (<MenuItem value={tag._id} >{tag.name}</MenuItem>)))
    }

    const handleCreatePost = async () => {
        const headers = {
            headers: { token: getToken() },
            'content-type': 'application/json',
        }
        let formData = new FormData()
        formData.append("title", title)
        formData.append("mainContent", mainContent)
        formData.append("content", content)
        formData.append("idTag", idTag)
        formData.append("date", getDay())
        console.log(getDay())
        formData.append("file", file)
        dispatch(handleLoading())
        try {
            const data = await PostAPI.createPost(headers, formData)
            MyNotification.createPost(data.success)
            dispatch(handleLoading())
            history.push(`/post/${data.post._id}`)
        } catch (error) {
            dispatch(handleLoading())
            MyNotification.createPost(error.response.data.message)
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
                            style={{ borderStyle: 'dotted' }}
                        >
                            FILE ĐÍNH KÈM
                            <input type='file'
                                onChange={evt => setFile(evt.target.files[0])}
                                disabled={loading}

                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={handleCreatePost}
                            disabled = {loading}
                        >
                            ĐĂNG BÀI
                        </Button>

                    </FormControl>
                </CardContent>
            </Card>
        </animated.div>)
}