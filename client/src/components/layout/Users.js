import React from 'react'
import {connect} from 'react-redux'
import {sendFriendRequest} from '../../actions/friendRequests'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const Users = ({profile: {searchedProfile}, sendFriendRequest}) => {

    if(!searchedProfile){
        return (
            <h1>No results</h1>
        )
    }
    
    const {userName} = searchedProfile.data
    const {userFullName} = searchedProfile.data
    const {user} = searchedProfile.data.profile

    const sndFriendRequest = () => {
        sendFriendRequest(user, userName, userFullName)
    } 

    return (
        <Container>
            <Jumbotron>
              <h1>{userName}</h1>
              <h5>{userFullName}</h5>
              <p>
                In order to start sending Recos to this user or view their profile they must accept your friend request.
              </p>
              <p>
                <Button type="submit" variant="primary" onClick={sndFriendRequest}>Request</Button>
              </p>
            </Jumbotron>
        </Container>
    )
}

Users.propType = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    sendFriendRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {sendFriendRequest})(Users)