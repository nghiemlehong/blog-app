import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import { TextField, FormControl, Select, MenuItem, Button, Box } from '@material-ui/core';
import { TagAPI } from '../../api/tagAPI'
import { PostAPI } from '../../api/postAPI'
import { getToken } from '../../utils/Common'
import { MyNotification } from '../../notification/MyNotification'
import {getAllPost} from '../../redux/actions/post'
import {useDispatch} from 'react-redux'
const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: 10
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles({
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
    }


})
export function CreatePost(props) {
    const [expanded, setExpanded] = React.useState('');
    const [listTag, setListTag] = useState([])
    const [title, setTitle] = useState('')
    const [mainContent, setMainContent] = useState('')
    const [content, setContent] = useState('')
    const [idTag, setIdTag] = useState('')
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()


    useEffect( () => {
        const fetchData = async() =>{
            try {
                const data = await TagAPI.getAllTag()
                setListTag(data.tags)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
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
        let today = new Date()
        let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        console.log(date)
        formData.append("date", date)
        formData.append("file", file)
        try {
            const data = await PostAPI.createPost(headers, formData)
            MyNotification.createPost(data.success)
            dispatch(getAllPost())
            resetState()
        } catch (error) {
            MyNotification.createPost(error.response.data.message)
        }
    }

    const resetState = ()=>{
        setExpanded('')
    }

    const classes = useStyles()
    return (
        <div className={classes.root} >
            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <CreateIcon />
                    <Typography>
                        Viết bài
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                        <FormControl variant="outlined">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.select}
                                value={idTag}
                                onChange = {evt=>setIdTag(evt.target.value)}
                            >
                                {listTag.map(tag => (<MenuItem value = {tag._id} >{tag.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <Box
                            className={classes.box}w
                            border={1}
                            borderRadius={16}
                            style={{ borderStyle: 'dotted' }}
                        >
                            Ảnh minh họa
                                <input type='file' onChange = {evt =>setFile(evt.target.files[0])} />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={handleCreatePost}
                        >
                            ĐĂNG BÀI
                            </Button>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
