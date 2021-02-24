import {React, useState} from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../actions/auth'
import  PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { sign } from 'jsonwebtoken'

function Register({signUp}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {firstName, lastName, email, password, passwordConfirm} = formData

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        signUp({firstName, lastName, email, password, passwordConfirm})
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={e => onSubmit(e)}>

              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First" id="firstName" value={firstName} onChange={e => onChange(e)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last" id="lastName" value={lastName} onChange={e => onChange(e)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type="email" placeholder="test@provider.com" id="email" value={email} onChange={e => onChange(e)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="password" value={password} onChange={e => onChange(e)}/>
              </Form.Group>


              <Form.Group>
                <Form.Label>Confirm Your Password</Form.Label>
                <Form.Control type="password" placeholder="Retype Password" id="passwordConfirm" value={passwordConfirm} onChange={e => onChange(e)}/>
              </Form.Group>

              <Button variant="outline-info" type="submit">
                Submit
              </Button>

            </Form>
        </div>
    )
}

Register.propTypes = {
  signUp: PropTypes.func.isRequired
}

export default connect(null, {signUp})(Register)
