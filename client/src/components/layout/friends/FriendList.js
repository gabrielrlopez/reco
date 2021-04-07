import React from 'react'
import Card from 'react-bootstrap/esm/Card'
import { deleteFriend } from '../../../actions/friends'
import { connect } from 'react-redux'
import  PropTypes from 'prop-types'

import ListGroup from 'react-bootstrap/esm/ListGroup'
import {XSquare} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/esm/Button'
import { reRender } from '../../../actions/profile'

const FriendList = ({deleteFriend, reRender, friends}) => {

    const unfriend = (e) => {
        e.preventDefault()
        deleteFriend(e.target.value)
        reRender(true)
    }

    return (
        <Card>
        <ListGroup variant="flush">
            {friends.map(friend => 
                <ListGroup.Item 
                    style = {{
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center"
                    }        
                }>
                    {`${friend.userFullName[0]} ${friend.userFullName[1]}`}
                    <Button value={friend.userId} variant="danger" onClick={unfriend}>Delete Friend</Button>
                </ListGroup.Item>)}
        </ListGroup>
        </Card>
    )
}

FriendList.propType ={
    deleteFriend: PropTypes.func.isRequired,
    reRender: PropTypes.func.isRequired
}

export default connect(null, {deleteFriend, reRender})(FriendList)