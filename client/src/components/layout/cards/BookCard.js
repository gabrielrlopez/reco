import React from 'react'
import Card from 'react-bootstrap/Card'
import CardButton from './CardButton'
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const BookCard = (
    {
        title, 
        authors, 
        cover, 
        onClickFunction, 
        style, 
        value, 
        variant, 
        caption,
        id, 
        style2, 
        value2, 
        variant2, 
        caption2,
        onClickFunction2
    }
    ) => {
    return <Card
    key={title}
    border="secondary"
    style={{width: '18rem'}}
    className='text-center'
    >
        <Card.Body>
            <Card.Header>
                {title}
            </Card.Header>
            <Card.Title>
                {authors}
            </Card.Title>
            <Card.Body>
                <img src={cover}/>
                <CardButton
                    onClickFunction={onClickFunction}
                    id={id}
                    caption={caption}
                    variant={variant}
                />
                <CardButton
                    onClickFunction={onClickFunction2}
                    caption={caption2}
                    variant={variant2}
                />
            </Card.Body>
        </Card.Body>    
    </Card> 
}

export default BookCard
