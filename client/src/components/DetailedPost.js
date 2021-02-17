import React from 'react'
import { Grid } from '@material-ui/core'
import { OnePost } from './OnePost'
import { useParams } from 'react-router-dom'
export function DetailedPost(props) {
    const { id } = useParams()
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Grid item xs={8} style={{ margin: 'auto', marginTop: '10px' }}>
            <OnePost id={id} />
        </Grid>
    )
}