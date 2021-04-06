import React from 'react'
import CardButton from './CardButton'
import '../styles/BookCard.css'
import {deleteBookFromMyBase} from '../../../actions/myBase'
import {connect} from 'react-redux'
import  PropTypes from 'prop-types'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const BookCard = (
    { 
        deleteBookFromMyBase,
        book,
    }) => {
    

    //if book has more than one author render every author on a new line
    const formatAuthors = (arr) => {
        if(arr === undefined) return
        return arr.length > 1 ? arr.map((author, i) =>(<Card.Title key={i}>{author}</Card.Title>)) : (<Card.Title>{arr}</Card.Title>)
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Options</Popover.Title>
          <Popover.Content>
            <CardButton 
                book={book}
                caption={"Delete"}
                variant={"warning"}
                style={{marginRight: "5px"}}
                onClickFunction={deleteBookFromMyBase}
            />
            <CardButton 
                caption={"Reco"}
                variant={"danger"}
            />
          </Popover.Content>
        </Popover>
    )

    return <Card
    key={book.googleId}
    border= "0"
    style={{backgroundColor: "transparent", cursor: "pointer" }}
    >   
        <OverlayTrigger rootClose trigger="click" placement="right" overlay={popover}>
            <Card.Body>
                <img width="180" src={book.cover}/>
            </Card.Body>
        </OverlayTrigger>
    </Card>
}

BookCard.propTypes = {
    deleteBookFromMyBase: PropTypes.func.isRequired,
}

export default connect(null, {deleteBookFromMyBase})(BookCard)
