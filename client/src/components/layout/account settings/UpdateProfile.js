import {React, useState} from 'react'
import {updateUserInfo} from '../../../actions/auth'
import  PropTypes from 'prop-types'
import {connect} from 'react-redux'
import '../styles/Account.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Pen} from 'react-bootstrap-icons'


const UpdateProfile = ({updateUserInfo}) => {  

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: ''
    })

    const {email, firstName, lastName} = formData

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault()
        updateUserInfo(email, firstName, lastName)
    }

    return (
        <>

          
          <div className="form-container" style={{margin: "0 auto", marginTop: "20px"}}>
          <h1>Update Your Profile <Pen /></h1>
          <Form onSubmit={onSubmit}>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" type="email" placeholder="Email" value={email} onChange={e => onChange(e)}/>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="firstName" type="text" placeholder="First Name" value={firstName} onChange={e => onChange(e)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={e => onChange(e)}/>
              </Form.Group>

              <Button variant="outline-info" type="submit">
                Submit
              </Button>

            </Form>
            </div>
        </>
    )
}

UpdateProfile.propType = {
  updatePassword: PropTypes.func.isRequired
}

export default connect(null, {updateUserInfo})(UpdateProfile)