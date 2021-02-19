import {React, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
 

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = async (e) => {
        const formInputs = {
            email,
            password
        }
        try {
            const config ={ 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios.post('/api/login', formInputs, config)
        } catch (error) {
            console.log(error.response.data);
        }
    }


    return (
        <div>
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
        </div>
    )
}

export default Login
