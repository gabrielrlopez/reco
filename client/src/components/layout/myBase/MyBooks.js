import React, {useEffect} from 'react'
import BookCard from '../cards/BookCard'
import Spinner from '../Spinner'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../../actions/profile'
import {deleteBookFromMyBase} from '../../../actions/myBase'
import  PropTypes from 'prop-types'
import '../styles/MyBooks.css'


const MyBooks = ({deleteBookFromMyBase, profile: {profile, loading}}) => {

    return  <>
            <h1>MyBase</h1>
            <h2>Favorites</h2>
            {profile ? 
                    <div className="base-container">
                        {loading && profile === null ? <Spinner/> : profile.data.userBase.books.favorites.map(book =>
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
                    </div>
                :
                null
            }
            <h2>Read Later</h2>
            {profile ? 
                    <div className="base-container">
                    {loading && profile === null ? <Spinner/> : profile.data.userBase.books.readLater.map(book =>
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
                    </div>
                :
                null
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
