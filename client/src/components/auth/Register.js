import {React, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'


function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {firstName, lastName, email, password, passwordConfirm} = formData

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // const body = JSON.stringify(newUser)
            await axios.post('api/users/signup', newUser, config)
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              passwordConfirm: ''
            })
        } catch (error) {
            console.log(error.response.data);
        }
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

export default Register
