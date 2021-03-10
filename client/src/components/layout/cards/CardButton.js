import React from 'react'
import Button from 'react-bootstrap/Button'

const CardButton = ({onClickFunction, style, value, variant, caption, id}) => {
    console.log(id)
    return <Button
            onClick={() => onClickFunction(id)}
            style={style}
            value={value}
            variant={variant}
        >{caption}</Button>
}

export default CardButton

