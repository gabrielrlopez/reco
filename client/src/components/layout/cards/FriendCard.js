import React from 'react'
import Card from 'react-bootstrap/Card'
import CardButton from './CardButton'
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const FriendCard = () => {
    return <Card>
        <Card.Header>
            Friend
        </Card.Header>
        <Card.Body>
            <CardButton>
                Accept
            </CardButton>
            <CardButton>
                Decline
            </CardButton>
        </Card.Body>
    </Card>
}

export default FriendCard