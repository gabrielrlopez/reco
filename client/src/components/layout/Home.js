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

        {/**If user has no books saved to their base */}
        <h1>Start Saving books to your personal base!</h1>

        {/**If user has friends */}
        <h1>See what your friends are reading</h1>

        {/**Recommend books based on what their favorites/readLater consist of */}


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
