import {React, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../../actions/profile'
import {acceptFriendRequest, declineFriendRequest} from '../../../actions/friendRequests'
import {searchFriends} from '../../../actions/friends'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
import FriendCard from '../cards/FriendCard'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Spinner from '../Spinner'

const Friends = ({
    getCurrentProfile,
    acceptFriendRequest,
    declineFriendRequest,
    searchFriends,
    profile:{profile, loading, searchedFriends}
    }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [searchedFriends])

    if(!profile || loading) return (<Spinner/>)

    const currentUserFriendRequests = profile.data.friendRequests
    const currentUserFriends = profile.data.friends


    const acceptRequest = (e) => {
        acceptFriendRequest(e.target.value)
        searchFriends(true)
    }
    const declineRequest = (e) => {
        declineFriendRequest(e.target.value)
        searchFriends(true)
    }

    return (
        <>

            {/*Friend Requests*/}
            {/*Only render request container if current user has friend requests pending*/}
            {currentUserFriendRequests.requests.length > 0 ? 
                <Container>
                    <h1>Friend Requests</h1>
                        {currentUserFriendRequests.requests.map(request =>
                        <Jumbotron>
                            <h1>{request.userName}</h1>
                            <h5>{request.userFullName}</h5>
                            <p>
                              <Button value={request.userId} onClick={acceptRequest} variant="success">Accept</Button>
                              <Button value={request.userId} onClick={declineRequest} variant="danger">Decline</Button>
                            </p>
                        </Jumbotron>)}
                </Container>

                : null
            }

            {/*Friends*/}

            <Container>
                <h1>Friends</h1>
                {currentUserFriends.map(friend => 
                    <FriendCard 
                        userName={friend.userName}
                        userFullName={friend.userFullName}
                    />
                )}
            </Container>
        </>
    )
}

Friends.PropType = {
    getCurrentProfile: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired,
    searchFriends: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect
    (mapStateToProps,
    {getCurrentProfile, 
     acceptFriendRequest,
     declineFriendRequest,
     searchFriends})(Friends)