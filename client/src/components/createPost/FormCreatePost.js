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
import {MyNotification} from '../../notification/MyNotification'
import {getToken} from '../../utils/Common'
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

    const getDay = () => {
        return moment().format('MMMM Do YYYY')
    }

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
    }, [])

    const renderTags = () => {
        return (listTag.map(tag =>
            (<MenuItem value={tag._id} >{tag.name}</MenuItem>)))
    }

    const handleCreatePost = async()=>{
        const headers = {
            headers: { token: getToken() },
            'content-type': 'application/json',
        }
        let formData = new FormData()
        formData.append("title", title)
        formData.append("mainContent", mainContent)
        formData.append("content", content)
        formData.append("idTag", idTag)
        let today = new Date()
        let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        console.log(date)
        formData.append("date", date)
        formData.append("file", file)
        try {
            const data = await PostAPI.createPost(headers, formData)
            MyNotification.createPost(data.success)
            resetState()
        } catch (error) {
            MyNotification.createPost(error.response.data.message)
        }
    }

    const resetState = ()=>{
        setFile(null)
        setTitle('')
        setContent('')
        setMainContent('')
        setIdTag('')
    }

    return (<Card>
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
                />
                <TextField
                    className={classes.input}
                    id="standard-multiline-static"
                    label="Nội dung"
                    multiline
                    rows={10}
                    variant="outlined"
                    value={content}
                    onChange={evt => setContent(evt.target.value)}
                />

                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel>Nhãn</InputLabel>
                    <Select
                        label="Nhãn"
                        value={idTag}
                        onChange={evt => setIdTag(evt.target.value)}
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
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    onClick = {handleCreatePost}
                >
                    ĐĂNG BÀI
                </Button>

            </FormControl>
        </CardContent>
    </Card>)
}