import React from 'react'
import './styles/Landing.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'

function Landing({auth: {isAuthenticated}}) {
    if(isAuthenticated) {
       return <Redirect to='/home'/>
    }

    return (
        <Container>
            <h1>Welcome to Reco! Where your friend has a new experience waiting for you!</h1>
        </Container>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired, 
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing)