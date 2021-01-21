import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import { TextField, FormControl, Select, MenuItem, Button, Box } from '@material-ui/core';
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
        width : '100%'
    }


})
export function CreatePost(props) {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
                    <FormControl className ={classes.formControl}>
                    <TextField
                            className={classes.input}
                            id="standard-multiline-static"
                            label="Tiêu đề"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            id="standard-multiline-static"
                            label="Nội dung chính"
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            id="standard-multiline-static"
                            label="Nội dung"
                            multiline
                            rows={10}
                            variant="outlined"
                        />
                        <FormControl variant="outlined">
                            <Select
                                className={classes.input}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.select}
                                placeholder="Thể loại"
                            >
                                <MenuItem value={10}>Âm nhạc</MenuItem>
                                <MenuItem value={20}>Thể thao</MenuItem>
                                <MenuItem value={30}>Phim truyện</MenuItem>
                            </Select>
                        </FormControl>
                        <Box
                            className={classes.box}
                            border={1}
                            borderRadius={16}
                            style={{ borderStyle: 'dotted' }}
                        >
                            Ảnh minh họa
                                <input type='file' />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                        >
                            ĐĂNG BÀI
                            </Button>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
