import {React, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../../actions/auth'
import  PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'

function Register({signUp, isAuthenticated}) {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {userName, firstName, lastName, email, password, passwordConfirm} = formData

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        signUp(userName, firstName, lastName, email, password, passwordConfirm)
    }

    if(isAuthenticated){
     return <Redirect to="/home" />
    }

    return (
          <Container>
            <div className="form-container" style={{margin: "0 auto"}}>
              <h1>Sign Up</h1>
              <Form onSubmit={e => onSubmit(e)}>

                <Form.Group>
                  <Form.Control type="text" placeholder="Username" id="userName" value={userName} onChange={e => onChange(e)}/>
                  <Form.Text className="text-muted">
                    Username can include symbols, numbers, and lower or uppercase letters. (e.g., user1234)
                    <p style={{color: "red"}}>Warning: You cannot change your username after signing up!</p>
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Control type="text" placeholder="First Name" id="firstName" value={firstName} onChange={e => onChange(e)}/>
                </Form.Group>

                <Form.Group>
                  <Form.Control type="text" placeholder="Last Name" id="lastName" value={lastName} onChange={e => onChange(e)}/>
                </Form.Group>

                <Form.Group>
                  <Form.Control type="email" placeholder="Email" id="email" value={email} onChange={e => onChange(e)}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else. (e.g., test@provider.com)
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Control type="password" placeholder="Password" id="password" value={password} onChange={e => onChange(e)}/>
                </Form.Group>


                <Form.Group>
                  <Form.Control type="password" placeholder="Retype Password" id="passwordConfirm" value={passwordConfirm} onChange={e => onChange(e)}/>
                </Form.Group>

                <Button variant="outline-info" type="submit">
                  Submit
                </Button>

              </Form>
            </div>
          </Container>
    )
}

Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {signUp})(Register)
