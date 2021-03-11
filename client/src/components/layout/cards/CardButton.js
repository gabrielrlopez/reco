import React from 'react'
import Button from 'react-bootstrap/Button'

const CardButton = ({onClickFunction, style, value, variant, caption, book}) => {
    return <Button
            onClick={() => onClickFunction(book)}
            style={style}
            value={value}
            variant={variant}
        >{caption}</Button>
}

export default CardButton

