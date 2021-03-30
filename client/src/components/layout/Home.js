import React, {useEffect, Fragment} from 'react'
import Spinner from './Spinner'
import {connect} from 'react-redux'
import  {getCurrentProfile} from '../../actions/profile'
import  {loadUser} from '../../actions/auth'
import  PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
function Home(
    {getCurrentProfile,
     auth: {user},
     profile: {profile, loading}
    }){
    useEffect(() => {
        getCurrentProfile()
    }, [])

    if(!user || loading) return <Spinner /> 
    if(!profile || loading) return <Spinner /> 

    return <Container> 
        <h1>
         Hi, {user.firstName}
        </h1>
    </Container> 
}

Home.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:  PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Home)
