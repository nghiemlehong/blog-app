import React from 'react'
import { LoginCard } from '../components/login/LoginCard'
import { Container, Grid } from '@material-ui/core'
export function Login(props) {
    return (
            <Container>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <LoginCard />
                </Grid>
            </Container>
    )
}