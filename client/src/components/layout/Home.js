import React, {useEffect, Fragment} from 'react'
import Spinner from './Spinner'
import {connect} from 'react-redux'
import  {getCurrentProfile} from '../../actions/profile'
import  PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
function Home({getCurrentProfile, auth, profile: {profile, loading}}) {
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return <Container>
        {loading && profile === null ? <Spinner /> : <Fragment>Test</Fragment>}
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
