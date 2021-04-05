import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import {CloudPlus} from 'react-bootstrap-icons'


const Alerting = ({alerts}) => {
    // const iconRendered = (msg) =>  {
    //     if(msg.includes('added')){
    //         return <>{msg} <CloudPlus color="royalblue" size={25}/></>
    //     } else {
    //        return msg
    //     }
    // }    

    return alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Container>
    <Alert key={alert.id} variant={alert.alertType}>
        {/* {iconRendered(alert.msg)} */}
        {alert.msg}
    </Alert>
    </Container>
    ))
}

Alerting.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})
export default connect(mapStateToProps)(Alerting)


