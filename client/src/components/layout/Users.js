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
import { Redirect } from 'react-router'

const Users = (
    {profile: {profile, loading, searchedProfile, searchedFriends},
    getCurrentProfile,
    searchFriends,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
    }) => {
    
    useEffect(() => {
        getCurrentProfile()
    }, [searchedFriends])

    if(!profile) return (<Spinner/>)
    if(!searchedProfile) return <Redirect to='/friends'/>
    

    const currentUserFriends = profile.data.friends
    const currentUserFriendsUserNames = profile.data.friends.map(friend => friend.userName)
    const currentUserFriendRequests = profile.data.friendRequests.requests.map(req => req.userId)
    const currentUserSentFriendRequests = profile.data.friendRequests.sentRequests

    const searchedUserName = searchedProfile.data.userName
    const searchedUserFullName = searchedProfile.data.userFullName
    const searchedUserId = searchedProfile.data.profile.user
    const searchedUserFriends = searchedProfile.data.profile.friends
    const searchedUserFriendRequests = searchedProfile.data.profile.friendRequests

    //On click functions for requests buttons 
    const request = () => {
        sendFriendRequest(searchedUserId, searchedUserFullName)
        searchFriends(false)
    }
    const cancelRequest = () => {
        cancelFriendRequest(searchedUserId)
        searchFriends(false)
    }
    const acceptRequest = () => {
        acceptFriendRequest(searchedUserId)
        searchFriends(false)
    }
    const declineRequest = () => {
        declineFriendRequest(searchedUserId, searchedUserName, searchedUserFullName)
        searchFriends(false)
    }

    //Render buttons based on the friend status between the current user and searched user
    const renderButton = () => {
        if(currentUserSentFriendRequests.includes(searchedUserId)) return (
            <>
            <Button variant="danger" onClick={cancelRequest}>Cancel Request</Button>
            </>
        )
        if(currentUserFriendRequests.includes(searchedUserId)) return (
            <>
            <Button variant="success" onClick={acceptRequest}>Accept</Button>
            <Button variant="danger" onClick={declineRequest}>Deny</Button>
            </>
        )
        return(
        <>
        <Button variant="primary" onClick={request}>Request</Button>
        </>
        )
    }

    return (
        <>
        {currentUserFriendsUserNames.includes(searchedUserName) ? 
            <Container>
                <Jumbotron>
                    <h1>{searchedUserName}</h1>
                    <h5>{`${searchedUserFullName[0]}`}'s favorites by category</h5>
                    <h5>{`${searchedUserFullName[0]}`}'s friends</h5>
                </Jumbotron>
            </Container>

            :

        <Container style={{marginTop: "20px"}}>
            <Jumbotron style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div>
              <h1>{searchedUserName}</h1>
              <h5>{`${searchedUserFullName[0]} ${searchedUserFullName[1]}`}</h5>
              <p>
                In order to send this user Recos or view their profile you must be friends.
              </p>
              </div>
              <p>
                {renderButton()}
              </p>
            </Jumbotron>
        </Container>
        }
        </>
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