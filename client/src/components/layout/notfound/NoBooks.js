import React from 'react'
import '../styles/NotFound.css'
import Container from 'react-bootstrap/esm/Container'

const NoBooks = () => {
    return (
        <>
            <Container className="centered">
                <h6>You have no books saved in your base</h6>
                <img src={'../../assets/books.svg'} />
            </Container>

        </>
    )
}

export default NoBooks