import {React} from 'react'
import {connect} from 'react-redux'
import NoFriends from '../notfound/NoFriends'

import Container from 'react-bootstrap/esm/Container'
import Spinner from '../Spinner'
import FriendList from './FriendList'


const Friends = ({profile:{profile, loading}}) => {


    if(!profile || loading) return (<Spinner/>)

    const currentUserFriends = profile.data.friends


    return (
        <>
                {currentUserFriends.length === 0 ? <NoFriends /> : 
                <>
                <Container>
                <h1>Friends</h1>
                <FriendList
                    friends={currentUserFriends}
                />
                </Container>
                </>
                }
        </>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, null)(Friends)