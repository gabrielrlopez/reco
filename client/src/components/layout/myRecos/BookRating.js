import React from 'react'

import {StarFill} from 'react-bootstrap-icons'
import {StarHalf} from 'react-bootstrap-icons'

const BookRating = ({rating}) => {

    if(!rating) return 'Unavailabe'

    const renderRating = (rating) => {

        let totalRating = []

        if(rating % 1 !== 0 ){
            const fullStars = Math.floor(rating)
            for(let i = 0; i < fullStars; i++){
                totalRating.push(<StarFill />)
            }
            totalRating.push(<StarHalf />)
        } else {
            for(let i = 0; i < rating; i++){
                totalRating.push(<StarFill />)
            }
        }
        return totalRating
    }

    return (
        <>
            {renderRating(rating)}
        </>
    )

}

export default BookRating