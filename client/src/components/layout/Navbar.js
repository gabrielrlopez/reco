import {React, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'
import {getSearchedProfile} from '../../actions/profile'
import {searchFriends} from '../../actions/friends'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Redirect} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/esm/Container'



const Navigation = ({
  getSearchedProfile,
  searchFriends,
  logout,
  profile:{searchedProfile, profile},
  auth: {isAuthenticated, loading}
  }) => {
    const [searchInput, setSearchInput] = useState('')

    const onChange = (e) => setSearchInput(e.target.value)

    const onSubmit = (e) => {
      e.preventDefault()
      if(searchInput){
        getSearchedProfile(searchInput)
      }
      searchFriends(true)
      setSearchInput('')
    }



    const authLinks = (
      <>

      {/************************************My Base*************************************/}

      <NavDropdown title="My Base" id="basic-nav-dropdown">

        <NavDropdown.Item href="/myBase/books">Books</NavDropdown.Item>
      
            <NavDropdown.Divider />
      
        <NavDropdown.Item href="#!">Video Games</NavDropdown.Item>
      
            <NavDropdown.Divider />
      
        <NavDropdown.Item href="#!">Movies</NavDropdown.Item>
      
            <NavDropdown.Divider />
      
        <NavDropdown.Item href="#!">Netflix Movies</NavDropdown.Item>
      
            <NavDropdown.Divider />
      
        <NavDropdown.Item href="#!">Food</NavDropdown.Item>
      
            <NavDropdown.Divider />
      
        <NavDropdown.Item href="#!">Recipes</NavDropdown.Item>
      
            <NavDropdown.Divider />
      
        <NavDropdown.Item href="#!">Youtube</NavDropdown.Item>

      </NavDropdown>

      {/************************************Send New Reco*************************************/}

      <NavDropdown title="Send New Reco" id="basic-nav-dropdown">

        <NavDropdown.Item href="/send-new-reco/books">Books</NavDropdown.Item>

            <NavDropdown.Divider />

        <NavDropdown.Item href="#!">Video Games</NavDropdown.Item>

            <NavDropdown.Divider />

        <NavDropdown.Item href="#!">Movies</NavDropdown.Item>
        
            <NavDropdown.Divider />

        <NavDropdown.Item href="#!">Netflix Movies</NavDropdown.Item>
        
            <NavDropdown.Divider />

        <NavDropdown.Item href="#!">Food</NavDropdown.Item>

            <NavDropdown.Divider />

        <NavDropdown.Item href="#!">Recipes</NavDropdown.Item>
        
            <NavDropdown.Divider />

        <NavDropdown.Item href="#!">Youtube</NavDropdown.Item>

      </NavDropdown>

      {/*************************************My Recos*************************************/}

      {profile ? <Nav.Link href="/myRecos"> My Recos{profile.data.recommendations.books.length > 0 ? <Badge variant="danger">{profile.data.recommendations.books.length}</Badge> : null}</Nav.Link> : 
      <Nav.Link href="/myRecos">Recos</Nav.Link>}

    
      </>
    )

    {/************************************Search bar*************************************/}
    const searchBar = (
      <>
      {/*************************************Manage Account************************************/}
          <NavDropdown title="Manage Account" id="basic-nav-dropdown">

              <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
            
                  <NavDropdown.Divider />
            
              <NavDropdown.Item href="/myAccount">My Account</NavDropdown.Item>
            
                  <NavDropdown.Divider />
            
              <NavDropdown.Item href="#!" onClick={logout}>Logout</NavDropdown.Item>

          </NavDropdown>

          <Form inline onSubmit={onSubmit}>
            <FormControl onChange={e => onChange(e)} value={searchInput} type="text" placeholder="Search Friends By Username" className="mr-sm-2" />
            <Button variant="outline-primary" type="submit">Search</Button>
          </Form>
          </>
    )

    {/************************************Not authenticated render*************************************/}

    const guestLinks = (
      <>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      </>
    )

    return (
          <>
            <Navbar bg="light" variant="light" expand="lg">
              <Container>
              <Navbar.Brand href="/">Reco</Navbar.Brand>
              <Nav className="mr-auto">
                {!loading && isAuthenticated ? authLinks : null}
              </Nav>
                {!loading && isAuthenticated ? searchBar : guestLinks}
              </Container>
            </Navbar>
            {searchedProfile ? <Redirect to="/searchFriends" /> : null}
          </>
    )
}

Navigation.propType = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getSearchedProfile: PropTypes.func.isRequired,
  searchFriends: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getSearchedProfile, searchFriends, logout})(Navigation)
