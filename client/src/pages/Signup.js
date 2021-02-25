import React from 'react'
import { SignUpCard } from '../components/signup/SignUpCard'
import { Grid, Container } from '@material-ui/core'
import bg from '../assets/bg-signup.jpg'
export function SignUp(props) {
    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bg})`,
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
                    <SignUpCard />
                </Grid>
            </Container>
        </>



    )
}