import React from 'react'
import '../styles/NotFound.css'
import Container from 'react-bootstrap/esm/Container'

const NoGames = () => {
    return (
        <>
            <Container className="centered">
                <h6>You have no games saved in your base</h6>
                <img src={'../../assets/games.svg'} />
            </Container>

        </>
    )
}

export default NoGames