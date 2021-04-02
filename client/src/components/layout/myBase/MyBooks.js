import React from 'react'
import BookCard from '../cards/BookCard'
import Spinner from '../Spinner'
import {connect} from 'react-redux'
import {deleteBookFromMyBase} from '../../../actions/myBase'
import  PropTypes from 'prop-types'
import '../styles/MyBooks.css'
import NoBooks from '../notfound/NoBooks'

import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/esm/Container'


const MyBooks = ({deleteBookFromMyBase, profile: {profile, loading}}) => {

    if(!profile || loading) return (<Spinner/>)

    const favoriteBooks = profile.data.userBase.books.favorites
    const readLaterBooks = profile.data.userBase.books.readLater

    return  <>
            
            {favoriteBooks.length === 0 && readLaterBooks.length === 0 ? <NoBooks /> : 
                <>
                    <h2>Favorites</h2>
                            <Carousel>
                                <Carousel.Item className="carousel" data-interval="false">
                                {favoriteBooks.map(book =>
                                    <BookCard
                                        key={book.googleId}
                                        title={book.title}
                                        authors={book.authors}
                                        cover={book.cover}
                                        book={book}
                                        onClickFunction={deleteBookFromMyBase}
                                        caption={'Remove'}
                                        variant={'warning'}
                                        caption2={'Reco A Friend'}
                                        variant2={'danger'}
                                    />
                                    )}
                                </Carousel.Item>
                            </Carousel>

                    <h2>Read Later</h2>
                            {readLaterBooks.map(book =>
                                <BookCard
                                    key={book.title}
                                    title={book.title}
                                    authors={book.authors}
                                    cover={book.cover}
                                    book={book}
                                    type={book.addedTo}
                                    onClickFunction={deleteBookFromMyBase}
                                    caption={'Remove'}
                                    variant={'warning'}
                                    caption2={'Reco A Friend'}
                                    variant2={'danger'}
                                />
                            )}
                </>
            }

            </>
}

MyBooks.propTypes = {
    deleteBookFromMyBase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:  PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {deleteBookFromMyBase})(MyBooks)
