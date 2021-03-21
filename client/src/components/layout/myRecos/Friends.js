import {React, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../../actions/profile'
import {acceptFriendRequest} from '../../../actions/friendRequests'
import {declineFriendRequest} from '../../../actions/friendRequests'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/esm/Container'
import FriendCard from '../cards/FriendCard'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const Friends = ({getCurrentProfile, acceptFriendRequest, declineFriendRequest, profile:{profile}}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])

    const decline = (e) => {
        try {
            e.preventDefault()
            declineFriendRequest(e.target.value)
        } catch (error) {
            console.log(error)
        }
    }

    const accept = (e) => {
        try {
            e.preventDefault()
            acceptFriendRequest(e.target.value)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <h1>Friend Requests</h1>
                {profile ? profile.data.friendRequests.requests.map(request =>
                <Jumbotron>
                    <h1>user</h1>
                    <h5>first, last</h5>
                    <p>
                        test
                    </p>
                    <p>
                      <Button value={request} onClick={accept} variant="primary">Accept</Button>
                      <Button value={request} onClick={decline} variant="danger">Decline</Button>
                    </p>
                </Jumbotron>) : null}
            <h1>Friends</h1>
        </Container>
    )
}

Friends.PropType = {
    getCurrentProfile: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, acceptFriendRequest, declineFriendRequest})(Friends)