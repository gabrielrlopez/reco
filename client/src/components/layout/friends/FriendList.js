import React from 'react'
import Card from 'react-bootstrap/esm/Card'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/esm/ListGroup'

const FriendList = ({friends}) => {
    return (
        <Card style={{width: "500px"}}>
        <ListGroup variant="flush">
            {friends.map(friend => <ListGroup.Item>{friend.userFullName}</ListGroup.Item>)}
        </ListGroup>
        </Card>
    )
}

export default FriendList