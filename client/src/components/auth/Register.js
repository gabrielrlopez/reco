import {React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {name, email, password, passwordConfirm} = formData

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if(password !== passwordConfirm){
            console.log('Passwords do not match!');
        } else {
            console.log(formData);
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={e => onSubmit(e)}>

              <Form.Group controlId="name" value={name} onChange={e => onChange(e)}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="First Last" />
              </Form.Group>

              <Form.Group controlId="email"  value={email} onChange={e => onChange(e)}>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type="email" placeholder="test@provider.com"/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="password" value={password} onChange={e => onChange(e)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
              </Form.Group>


              <Form.Group controlId="passwordConfirm" value={passwordConfirm} onChange={e => onChange(e)}>
                <Form.Label>Confirm Your Password</Form.Label>
                <Form.Control type="password" placeholder="Retype Password"/>
              </Form.Group>

              <Button variant="outline-success" type="submit">
                Submit
              </Button>

            </Form>
        </div>
    )
}

export default Register
