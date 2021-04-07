import React from 'react'
import '../styles/NotFound.css'

import Container from 'react-bootstrap/esm/Container'
import {PersonPlus} from 'react-bootstrap-icons'

const NoFriendRequests = () => {
    return (
        <>
                <Container>
                <div className="centered">
                    <h6>No friend requests. Tell your friends about us and start sending each other Recos!</h6>
                    <h6> If you have a friend using our platform please search for their username in the search bar on your top right corner.</h6>
                    <h6>(Search is case sensitive!)</h6>
                    <PersonPlus size={100}/>
                </div>
                </Container>

        </>
    )
}

export default NoFriendRequests