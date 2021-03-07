import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const navbar = ({logout, auth: {isAuthenticated, loading}}) => {
    const authLinks = (
      <>
      <Nav.Link href="/my-base">myBase</Nav.Link>
      <Nav.Link href="#!">myRecommendations</Nav.Link>
      <NavDropdown title="Send New Recommendation" id="basic-nav-dropdown">
        <NavDropdown.Item href="/send-new-reco/books">Books</NavDropdown.Item>
        <NavDropdown.Item href="#!">Video Games</NavDropdown.Item>
        <NavDropdown.Item href="#!">Movies</NavDropdown.Item>
        <NavDropdown.Item href="#!">Netflix Movies</NavDropdown.Item>
        <NavDropdown.Item href="#!">Food</NavDropdown.Item>
        <NavDropdown.Item href="#!">Recipes</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#!" onClick={logout}>Logout</Nav.Link>
      </>
    )

    const guestLinks = (
      <>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      </>
    )

    return (
        <div>
            <Navbar bg="light" variant="light">
              <Navbar.Brand href="/landing">Reco</Navbar.Brand>
              <Nav className="mr-auto">
                {!loading && isAuthenticated ? authLinks : guestLinks}
              </Nav>
              {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
              </Form> */}
            </Navbar>
        </div>
    )
}

navbar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(navbar)
