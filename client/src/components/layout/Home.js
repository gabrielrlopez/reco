import React, {useEffect, Fragment} from 'react'
import Spinner from './Spinner'
import {connect} from 'react-redux'
import  PropTypes from 'prop-types'

import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import {CloudPlus} from 'react-bootstrap-icons'
import {PersonPlus} from 'react-bootstrap-icons'
import {PersonBadge} from 'react-bootstrap-icons'
import {EmojiLaughing} from 'react-bootstrap-icons'
function Home(
    {
     auth: {user},
     profile: {profile}
    }){

    if(!user) return <Spinner /> 
    if(!profile) return <Spinner /> 

    const usersSavedBooks = profile.data.userBase.books
    const usersFriends = profile.data.friends

    return <Container> 
        <div style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1>
         Hi, {user.firstName} 
        </h1>
        <h3>
            <PersonBadge size={30} /> {`${user.userName}`}
        </h3>
        </div>

        {/**If user has friends */}
        {usersFriends.length > 0 ? 
            <Container style={{textAlign: "center", marginTop: "100px"}}>
            <EmojiLaughing size={100} />
            <h3>Start sending Recos to your friends!</h3>
            <Button variant='danger' style={{marginTop: "20px"}} href='/send-new-reco/books'>Let's go!</Button>
            </Container>
            : null
        }

        {/**If user has no books saved to their base */}
        {usersSavedBooks.favorites.length === 0 && usersSavedBooks.readLater.length === 0 ? 
            <Container style={{textAlign: "center", marginTop: "100px"}}>
            <CloudPlus size={100} />
            <h3>Start saving books to your personal base!</h3>
            <Button style={{marginTop: "20px"}} href='/send-new-reco/books'>Search for books</Button>
            </Container>
            : null
        }
        
        {/**If user has no friends*/}
        {usersFriends.length === 0 ? 
            <Container style={{textAlign: "center", marginTop: "100px"}}>
            <PersonPlus size={100} />
            <h3>If you have a friend using our platform please search for their username in the search bar on your top right corner.
                (Search is case sensitive!)</h3>
            </Container>
            : null
        }


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
