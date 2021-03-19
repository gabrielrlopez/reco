import React, { useState } from 'react'
import {addBookToMyBase} from '../../../actions/myBase'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import {connect} from 'react-redux'
import  PropTypes from 'prop-types'
import Spinner from '../Spinner'

function Books({addBookToMyBase}) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onChange = (e) => setSearchInput(e.target.value)

    const searchGoogleBooks = async (input) => {
       setLoading(true)
       if(!input) return (setLoading(false))
       const data = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=10&key=${process.env.REACT_APP_BOOK_API_KEY}`)
       const books = data.data['items'].map(book => {
            const {volumeInfo} = book
            book = {
                googleId: book.id,
                title: volumeInfo.title,
                authors: volumeInfo.authors,
                publisher: volumeInfo.publisher,
                publishedDate: volumeInfo.publishedDate,
                description: volumeInfo.description,
                pageCount: volumeInfo.pageCount,
                genre: volumeInfo.categories,
                averageRating: volumeInfo.averageRating,
                maturityRating: volumeInfo.maturityRating,
                cover: volumeInfo.imageLinks,
                previewLink: volumeInfo.previewLink
            }
            return book
       })
       let bookResults = books.filter(book => book.cover !== undefined )
       bookResults.map(book => book.cover = book.cover.thumbnail)
       setSearchResults(bookResults)
       setLoading(false)
    }

    //disable favorite/readLater buttons for 2 seconds(if not user can click fast enough to store a duplicate book in their base.)
    const disableButtons = () => {
        setIsDisabled(true)
        setTimeout(() =>{
            setIsDisabled(false)
        }, 500)
    }
    
    //if book has more than one author render every author on a new line
    const formatAuthors = (arr) => {
        if(arr === undefined) return
        return arr.length > 1 ? arr.map((author, i) =>(<Card.Title key={i}>{author}</Card.Title>)) : (<Card.Title>{arr}</Card.Title>)
    }

    //Perform get request to Google Books api 
    const onSubmit = (e) => {
        e.preventDefault()
        if(!searchInput) return
        searchGoogleBooks(searchInput)
    }
    
    //Add books to users profile
    const favorite = (e) => {
        e.preventDefault()
        disableButtons()
        try {
            const book = searchResults.find(book => book.title === e.target.value)
            book.addedTo = 'favorites'
            addBookToMyBase(book)
        } catch (error) {
            console.error(error.message)
        }
    }

    const readLater = (e) => {
        e.preventDefault()
        disableButtons()
        try {
            const book = searchResults.find(book => book.title === e.target.value)
            book.addedTo = 'readLater'
            addBookToMyBase(book)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Container>
            <h1>Recommend a book to a friend, or add it to your library of favorites.</h1>
            <h2>Haven't read it? Add it to your "read it later" library!</h2>
            <br></br>
            <Form onSubmit={onSubmit}>
                <Form.Row className="align-items-center">
                    <Col>
                    <Form.Control size="lg" type="text" placeholder="Search books by author or title" id="searchInput" value={searchInput} onChange={e => onChange(e)} />
                    </Col>
                    <Col>
                    <Button type="submit" className="mb-2" variant="outline-success">
                      Search
                    </Button>
                    </Col>
                </Form.Row>
            </Form>
            <br></br>
            {loading ? <Spinner /> : <CardColumns>
            {searchResults.map(book => {
                return <Card
                border="primary"
                style={{width: '18rem'}}
                className='text-center'
                key={book.googleId}
                >
                    <Card.Body>
                        <Card.Header>
                            {book.title}
                        </Card.Header>

                        {formatAuthors(book.authors)}

                        <Card.Body>
                            <img src={book.cover}/>
                            <Row 
                            className="justify-content-md-center"
                            style={{padding: '5px'}}
                            >
                                <Button 
                                disabled={isDisabled}
                                onClick={favorite}
                                style={{marginRight: '5px'}}
                                value={book.title}
                                variant="primary">
                                    Favorite
                                </Button>
                                <Button
                                disabled={isDisabled}
                                onClick={readLater}
                                value={book.title}
                                variant="primary">
                                    Read later
                                </Button>
                            </Row>
                            <Button variant="danger">Reco a friend</Button>
                        </Card.Body>
                    </Card.Body>    
                </Card>
            })}
        </CardColumns>}
        </Container>
    )
}

Books.propType ={
    addBookToDB: PropTypes.func.isRequired,
}

export default connect(null, {addBookToMyBase})(Books)
