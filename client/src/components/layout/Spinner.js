import Spinner from 'react-bootstrap/Spinner'
import React from 'react'
import Container from 'react-bootstrap/esm/Container'

export default () => {
    return (
        <Container style={{textAlign: "center", marginTop: "20px"}}>
        <Spinner animation="border" variant="primary" />
        </Container>
    )
}
