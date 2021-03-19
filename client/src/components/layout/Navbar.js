import {React, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'
import {getSearchedProfile} from '../../actions/profile'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Redirect} from 'react-router-dom'


const Navigation = ({getSearchedProfile, logout, profile:{searchedProfile}, auth: {isAuthenticated, loading}}) => {
    const [searchInput, setSearchInput] = useState('')

    const onChange = (e) => setSearchInput(e.target.value)

    const onSubmit = (e) => {
      e.preventDefault()
      if(searchInput)getSearchedProfile(searchInput)
    }

    const authLinks = (
      <>
      <NavDropdown title="myBase" id="basic-nav-dropdown">
        <NavDropdown.Item href="/myBase/books">Books</NavDropdown.Item>
        <NavDropdown.Item href="#!">Video Games</NavDropdown.Item>
        <NavDropdown.Item href="#!">Movies</NavDropdown.Item>
        <NavDropdown.Item href="#!">Netflix Movies</NavDropdown.Item>
        <NavDropdown.Item href="#!">Food</NavDropdown.Item>
        <NavDropdown.Item href="#!">Recipes</NavDropdown.Item>
        <NavDropdown.Item href="#!">Youtube</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="MyRecommendations" id="basic-nav-dropdown">
      <NavDropdown.Item href="/myRecos">MyRecos</NavDropdown.Item>
        <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Send New Recommendation" id="basic-nav-dropdown">
        <NavDropdown.Item href="/send-new-reco/books">Books</NavDropdown.Item>
        <NavDropdown.Item href="#!">Video Games</NavDropdown.Item>
        <NavDropdown.Item href="#!">Movies</NavDropdown.Item>
        <NavDropdown.Item href="#!">Netflix Movies</NavDropdown.Item>
        <NavDropdown.Item href="#!">Food</NavDropdown.Item>
        <NavDropdown.Item href="#!">Recipes</NavDropdown.Item>
        <NavDropdown.Item href="#!">Youtube</NavDropdown.Item>
      </NavDropdown>

      <Form inline onSubmit={onSubmit}>
        <FormControl onChange={e => onChange(e)} value={searchInput} type="text" placeholder="Search for friends" className="mr-sm-2" />
        <Button variant="outline-primary" type="submit">Search</Button>
      </Form>

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
              <Navbar.Brand href="/">Reco</Navbar.Brand>
              <Nav className="mr-auto">
                {!loading && isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Navbar>
            {searchedProfile && isAuthenticated ? <Redirect to="/searchFriends" /> : null}
        </div>
    )
}

Navigation.propType = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getSearchedProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getSearchedProfile, logout})(Navigation)
