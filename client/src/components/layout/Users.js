import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {sendFriendRequest, cancelFriendRequest, acceptFriendRequest, declineFriendRequest} from '../../actions/friendRequests'
import {searchFriends} from '../../actions/friends'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { getCurrentProfile } from '../../actions/profile'

const Users = (
    {profile: {profile, loading, searchedProfile, searchedFriends},
    getCurrentProfile,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
    }) => {
    
    useEffect(() => {
        getCurrentProfile()
    }, [searchedFriends])

    if(!profile) return (<Spinner/>)
    if(!searchedProfile) return (<h1>No Results</h1>)
    

    const currentUserFriends = profile.data.friends
    const currentUserFriendRequests = profile.data.friendRequests

    const searchedUserName = searchedProfile.data.userName
    const searchedUserFullName = searchedProfile.data.userFullName
    const searchedUserId = searchedProfile.data.profile.user
    const searchedUserFriends = searchedProfile.data.profile.friends
    const searchedUserFriendRequests = searchedProfile.data.profile.friendRequests

    //On click functions for requests buttons 
    const request = () => {
        sendFriendRequest()
    }
    const cancelRequest = () => {
        cancelFriendRequest()
    }
    const acceptRequest = () => {
        acceptFriendRequest()
    }
    const declineRequest = () => {
        declineFriendRequest()
    }

    //Render buttons based on the friend status between the current user and searched user
    const renderButton = () => {
        if(currentUserFriendRequests.sentRequests.includes(searchedUserId)) return (
            <>
            <Button type="submit" variant="danger">Cancel Request</Button>
            </>
        )
        if(currentUserFriendRequests.requests.includes(searchedUserId)) return (
            <>
            <Button type="submit" variant="success">Accept</Button>
            <Button type="submit" variant="danger">Deny</Button>
            </>
        )
        return(
        <>
        <Button type="submit" variant="primary" onClick={request}>Request</Button>
        </>
        )
    }

    return (
        <Container>
            <Jumbotron>
              <h1>{searchedUserName}</h1>
              <h5>{searchedUserFullName}</h5>
              <p>
                In order to send this user Recos or view their profile you must be friends.
              </p>
              <p>
                {renderButton()}
              </p>
            </Jumbotron>
        </Container>
    )
}

Users.propType = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    searchFriends: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    cancelFriendRequest: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(
    mapStateToProps,
    {
     getCurrentProfile,
     searchFriends,
     sendFriendRequest,
     cancelFriendRequest,
     acceptFriendRequest,
     declineFriendRequest
    })(Users)