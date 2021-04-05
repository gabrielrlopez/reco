import React from 'react'
import '../styles/NotFound.css'

import Container from 'react-bootstrap/esm/Container'
import {People} from 'react-bootstrap-icons'

const NoFriends = () => {
    return (
        <>
                <Container>
                <div className="centered">
                    <h6>No friends yet.. Tell your friends about us and start sending each other recos!</h6>
                    <h6> If you have a friend using our platform please search for their username in the search bar on your top right corner.</h6>
                    <h6>(Search is case sensitive!)</h6>
                    <People size={100}/>
                </div>
                </Container>

        </>
    )
}

export default NoFriends