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
        book,
        value, 
        variant, 
        caption,
        style, 
        onClickFunction2,
        book2,
        value2, 
        variant2, 
        caption2,
        style2, 
    }) => {


    //if book has more than one author render every author on a new line
    const formatAuthors = (arr) => {
        if(arr === undefined) return
        return arr.length > 1 ? arr.map(author =>(<Card.Title>{author}</Card.Title>)) : (<Card.Title>{arr}</Card.Title>)
    }

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
            {formatAuthors(authors)}
            <Card.Body>
                <img src={cover}/>
                <CardButton
                    onClickFunction={onClickFunction}
                    book={book}
                    caption={caption}
                    variant={variant}
                />
                <CardButton
                    onClickFunction={onClickFunction2}
                    book={book2}
                    caption={caption2}
                    variant={variant2}
                />
            </Card.Body>
        </Card.Body>    
    </Card> 
}

export default BookCard
