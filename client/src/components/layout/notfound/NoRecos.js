import React from 'react'
import '../styles/NotFound.css'
import Container from 'react-bootstrap/esm/Container'

const NoRecos = () => {
    return (
        <>
            <Container className="centered">
                <h6>No Recos yet.. Tell your friends about us and start sending each other recos!</h6>
                <h6> If you have a friend using our platform please search for their username in the search bar on your top right corner.</h6>
                <h6>(Search is case sensitive!)</h6>
                <img style={{height: "100px", width: "100px"}} src={'../../assets/inbox.svg'} />
            </Container>

        </>
    )
}

export default NoRecos