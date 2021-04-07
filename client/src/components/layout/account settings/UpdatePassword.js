import {React, useState} from 'react'
import {updatePassword} from '../../../actions/auth'
import  PropTypes from 'prop-types'
import {connect} from 'react-redux'
import '../styles/Account.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Lock} from 'react-bootstrap-icons'

const UpdatePassword = ({updatePassword}) => {  

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const {currentPassword, newPassword, confirmPassword} = formData

    const onChange = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault()
        updatePassword(currentPassword, newPassword, confirmPassword)
    }

    return (
        <>
        <div className="form-container" style={{margin: "0 auto", marginTop: "20px"}}>
          <Form onSubmit={onSubmit}>
          <h1>Password Change <Lock /> </h1>  
              
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control id="currentPassword" type="password" placeholder="Current Password" value={currentPassword} onChange={e => onChange(e)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control id="newPassword" type="password" placeholder="Password" value={newPassword} onChange={e => onChange(e)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control id="confirmPassword" type="password" placeholder="Password" value={confirmPassword} onChange={e => onChange(e)}/>
              </Form.Group>

              <Button variant="outline-info" type="submit">
                Submit
              </Button>

            </Form>
            </div>
        </>
    )
}

UpdatePassword.propType = {
  updatePassword: PropTypes.func.isRequired,
}

export default connect(null, {updatePassword})(UpdatePassword)
