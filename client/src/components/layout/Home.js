import React, {useEffect, Fragment} from 'react'
import Spinner from './Spinner'
import {connect} from 'react-redux'
import  {getCurrentProfile} from '../../actions/profile'
import  {loadUser} from '../../actions/auth'
import  PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
function Home(
    {
     auth: {user},
     profile: {profile}
    }){

    if(!user) return <Spinner /> 
    if(!profile) return <Spinner /> 

    return <Container> 
        <h1>
         Hi, {user.firstName}
        </h1>
    </Container> 
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    profile:  PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, null)(Home)
