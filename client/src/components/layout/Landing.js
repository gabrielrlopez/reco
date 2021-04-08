import React from 'react'
import './styles/Landing.css'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import PropTypes from 'prop-types'

function Landing({auth: {isAuthenticated}}) {
    if(isAuthenticated) {
       return <Redirect to='/home'/>
    }

    return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Welcome to Reco!</h1>
          <p className='lead'>
            Where your friend has a new experience waiting for you
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary' style={{marginRight: "5px"}}>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired, 
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing)