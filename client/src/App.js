import { Fragment, useEffect } from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"
import PrivateRoute from './components/routing/PrivateRoute'
import {loadUser} from './actions/auth'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Home from './components/layout/Home'
import Landing from './components/layout/Landing'
import Books from './components/layout/Books'
import MyBase from './components/layout/MyBase'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//Redux
import {Provider} from 'react-redux'
import store from './store'


const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Navbar />
                <Alert />
                  <Route exact path='/landing' component={Landing}/>
                  <Switch>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                  <PrivateRoute exact path='/home' component={Home}/>
                  <Route exact path='/profile' component={Login}/>
                  <PrivateRoute exact path='/my-base' component={MyBase}/>
                  <PrivateRoute exact path='/send-new-reco/books' component={Books}/>
                  </Switch>
            </Fragment>
        </BrowserRouter> 
    </Provider>
)}


export default App
