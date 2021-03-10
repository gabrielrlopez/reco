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
import Books from './components/layout/recos/Books'
import MyBooks from './components/layout/myBase/MyBooks'
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
                  <Switch>
                  <Route exact path='/' component={Landing}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                  <PrivateRoute exact path='/home' component={Home}/>
                  <PrivateRoute exact path='/myBase/books' component={MyBooks}/>
                  <PrivateRoute exact path='/send-new-reco/books' component={Books}/>
                  </Switch>
            </Fragment>
        </BrowserRouter> 
    </Provider>
)}


export default App
