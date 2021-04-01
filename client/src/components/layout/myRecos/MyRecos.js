import React from 'react'
import {connect} from 'react-redux'
import BookCard from '../cards/BookCard'
import  PropTypes from 'prop-types'
import Spinner from '../Spinner'
import Jumbotron from 'react-bootstrap/esm/Jumbotron'
import Container from 'react-bootstrap/esm/Container'

const MyRecos = ({profile: {profile, loading}}) => {

    if(!profile) return (<Spinner/>)

    const recos = profile.data.recommendations.books
    

    return (
        <Container>
            <h1>New Recommendations</h1>
            <h1>Books</h1>
            {profile ? 
                    <>
                        {loading && profile === null ? <Spinner/> : recos.map(book =>
                            <Jumbotron>
                            <h1>{book.userFullName}</h1>
                            <BookCard
                                key={book.reco.googleId}
                                title={book.reco.title}
                                authors={book.reco.authors}
                                cover={book.reco.cover}
                                book={book}
                                // onClickFunction={}
                                caption={'Remove'}
                                variant={'warning'}
                                caption2={'Reco A Friend'}
                                variant2={'danger'}
                            />
                            </Jumbotron>
                        )}
                    </>
                :
                null
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, null)(MyRecos)