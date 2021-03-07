import {React, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import  PropTypes from 'prop-types'
import {login} from '../../actions/auth'
import Container from 'react-bootstrap/esm/Container'
 

function Login({login, isAuthenticated}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = async (e) => {
        e.preventDefault()
        login(email, password)
    }

    //Redirect if logged in 
    if(isAuthenticated){
        return <Redirect to="/home" />
    }


    return (
          <Container>
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control id="email" type="email" placeholder="Enter email" value={email} onChange={e => onChange(e)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" type="password" placeholder="Password" value={password} onChange={e => onChange(e)}/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button variant="outline-info" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
    )
}

Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
