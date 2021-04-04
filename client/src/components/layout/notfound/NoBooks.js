import React from 'react'
import '../styles/NotFound.css'

import Container from 'react-bootstrap/esm/Container'
import {Bookshelf} from 'react-bootstrap-icons'

const NoBooks = () => {
    return (
        <>
            <Container className="centered">
                <h6>You have no books saved in your base</h6>
                <Bookshelf size={100}/>
            </Container>

        </>
    )
}

export default NoBooks