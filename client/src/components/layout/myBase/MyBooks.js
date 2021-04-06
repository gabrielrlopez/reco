import React from 'react'
import BookCard from '../cards/BookCard'
import Spinner from '../Spinner'
import {connect} from 'react-redux'
import  PropTypes from 'prop-types'
import NoBooks from '../notfound/NoBooks'
import {deleteBookFromMyBase} from '../../../actions/myBase'
import CardButton from '../cards/CardButton'
import '../styles/MyBooks.css'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";


const MyBooks = ({deleteBookFromMyBase, profile: {profile, loading}}) => {

    if(!profile || loading) return <Spinner/> 

    //Users books array
    const favoriteBooks = profile.data.userBase.books.favorites
    const readLaterBooks = profile.data.userBase.books.readLater

    //Carousel responsive functionality
    const responsive = {
        desktop: {
          breakpoint: { max: 2000, min: 1024 },
          items: 9
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Options</Popover.Title>
          <Popover.Content>
            <CardButton 
                // book={book}
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

    return <>
          {favoriteBooks.length === 0 && readLaterBooks.length === 0 ? <NoBooks /> : 
                <>
                    <h2 style={{margin: "23px"}}>Favorites</h2>
                    <Carousel draggable={false} responsive={responsive} infinite={true}>
                        {favoriteBooks.map(book => <BookCard
                               key={book.googleId}
                               book={book}
                           />)}
                    </Carousel>

                    <h2 style={{margin: "23px"}}>Read Later</h2>
                        <Carousel responsive={responsive} infinite={true}>
                            {readLaterBooks.map(book => 
                              <OverlayTrigger rootClose trigger="click" placement="right" overlay={popover}>
                              <BookCard
                                 key={book.googleId}
                                 book={book}
                              />
                              </OverlayTrigger>
                              )}
                        </Carousel>
                </>
          }

    </>
}

MyBooks.propTypes = {
    auth: PropTypes.object.isRequired,
    profile:  PropTypes.object.isRequired,
    deleteBookFromMyBase: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {deleteBookFromMyBase})(MyBooks)
