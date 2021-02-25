import React from 'react'
import { LoginCard } from '../components/login/LoginCard'
import { Container, Grid } from '@material-ui/core'
import srcBg from '../assets/76405539_p0.jpg'
export function Login(props) {

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${srcBg})`,
                    backgroundSize: 'cover',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                }}
            >
            </div>
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


        </>

    )
}