import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'



function Books() {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const onChange = (e) => setSearchInput(e.target.value)

    const searchGoogleBooks = async (input) => {
       const data = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=10&key=${process.env.REACT_APP_BOOK_API_KEY}`)
       const books = data.data['items'].map(book => {
            const {volumeInfo} = book
            book = {
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
       const bookResults = books.filter(book => book.cover !== undefined )
       setSearchResults(bookResults)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        searchGoogleBooks(searchInput)
    }

    console.log(searchResults)

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
        <CardColumns>
            {searchResults.map(book => {
                const {thumbnail} = book.cover
                return <Card 
                border="secondary"
                style={{width: '18rem'}}
                className='text-center'
                >
                    <Card.Body>
                        <Card.Header>
                            {book.title}
                        </Card.Header>
                        <Card.Title>
                            {book.authors}
                        </Card.Title>
                        <Card.Body>
                            <img src={thumbnail}/>
                            <Container>
                            <Row 
                            className="justify-content-md-center"
                            style={{padding: '5px'}}
                            >
                                <Button style={{marginRight: '5px'}} variant="primary">Favorite</Button>
                                <Button variant="primary">Read later</Button>
                            </Row>
                            <Button variant="danger">Reco a friend</Button>
                            </Container>
                        </Card.Body>
                    </Card.Body>    
                </Card>
            })}
        </CardColumns>
        </Container>
    )
}

export default Books
