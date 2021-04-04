import React from 'react'
import UpdateProfile from './account settings/UpdateProfile'
import UpdatePassword from './account settings/UpdatePassword'

import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const MyAccount = () => {
    return (
            <Container>
                <h1>Account Settings</h1>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="profile" title="Your Profile">
                        <UpdateProfile />
                    </Tab>
                    <Tab eventKey="home" title="Login & Security">
                      <UpdatePassword />
                    </Tab>
                </Tabs>
            </Container>
    )
}

export default MyAccount