import React from 'react'
import Card from 'react-bootstrap/Card'
import CardButton from './CardButton'
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const FriendCard = ({userName, userFullName}) => {
    return <Card
    border="primary"
    style={{width: '18rem'}}
    className='text-center'
    // key={}
    >
        <Card.Body>
        <Card.Header>
            {userName}
        </Card.Header>
        <Card.Body>
            {userFullName}
        </Card.Body>
        </Card.Body>
    </Card>
}

export default FriendCard