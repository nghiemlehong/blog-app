import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
   
});

export function Footer(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={4} >
                        <Typography gutterBottom>
                            <a href='' >Giới thiệu</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Typography gutterBottom>
                            <a href='' >Giới thiệu</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Typography gutterBottom>
                            <a href='' >Giới thiệu</a>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
