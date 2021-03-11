import React, {useEffect, Fragment} from 'react'
import BookCard from '../cards/BookCard'
import Spinner from '../Spinner'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import  {getCurrentProfile, deleteBookFromMyBase} from '../../../actions/profile'
import  PropTypes from 'prop-types'
import '../styles/MyBooks.css'

const MyBooks = ({getCurrentProfile, deleteBookFromMyBase, profile: {profile, loading}}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])

    
    return  <Fragment>
            <h1>MyBase</h1>
            <h2>Favorites</h2>
            {profile ? 
                    <div className="base-container">
                        {loading && profile === null ? <Spinner/> : profile.data.books.favorites.map(book =>
                            <BookCard
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
                    {loading && profile === null ? <Spinner/> : profile.data.books.readLater.map(book =>
                        <BookCard
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
            </Fragment>
}

MyBooks.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteBookFromMyBase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:  PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteBookFromMyBase})(MyBooks)
