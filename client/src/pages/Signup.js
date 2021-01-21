import React from 'react'
import {SignUpCard} from '../components/signup/SignUpCard'
import {Grid, Container }from '@material-ui/core'
export function SignUp(props){
    return (
        <Container>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <SignUpCard />
            </Grid>
        </Container>

    )
}