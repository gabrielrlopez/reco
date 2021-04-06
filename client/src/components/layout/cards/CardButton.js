import React from 'react'
import Button from 'react-bootstrap/Button'

const CardButton = ({onClickFunction, book, style, variant, caption}) => {
    return <Button
            onClick={() => onClickFunction(book)}
            style={style}
            variant={variant}
        >{caption}</Button>
}

export default CardButton

