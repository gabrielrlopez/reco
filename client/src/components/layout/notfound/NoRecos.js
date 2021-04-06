import React from 'react'
import '../styles/NotFound.css'

import Container from 'react-bootstrap/esm/Container'
import {Inbox} from 'react-bootstrap-icons'

const NoRecos = () => {
    return (
        <>
            <Container className="centered">
                <h6>No Recos yet.. Tell your friends about us and start sending each other recos!</h6>
                <h6> If you have a friend using our platform please search for their username in the search bar on your top right corner.</h6>
                <h6>(Search is case sensitive!)</h6>
                <Inbox size={100} />
            </Container>

        </>
    )
}

export default NoRecos