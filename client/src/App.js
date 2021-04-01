import { useEffect } from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"
import PrivateRoute from './components/routing/PrivateRoute'
import {loadUser} from './actions/auth'
import {getCurrentProfile} from './actions/profile'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MyAccount from './components/layout/MyAccount'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Home from './components/layout/Home'
import Landing from './components/layout/Landing'
import Books from './components/layout/recos/Books'
import MyBooks from './components/layout/myBase/MyBooks'
import MyRecos from './components/layout/myRecos/MyRecos'
import Friends from './components/layout/myRecos/Friends'
import Users from './components/layout/Users'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//Redux
import {Provider} from 'react-redux'
import store from './store'


const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
        store.dispatch(getCurrentProfile())
    }, [])
    
    return (
    <Provider store={store}>
        <BrowserRouter>
                  <Navbar />
                  <Alert />
                  <Switch>
                  <Route exact path='/' component={Landing}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                  <PrivateRoute exact path='/myAccount' component={MyAccount}/>
                  <PrivateRoute exact path='/home' component={Home}/>
                  <PrivateRoute exact path='/myBase/books' component={MyBooks}/>
                  <PrivateRoute exact path='/myRecos' component={MyRecos} />
                  <PrivateRoute exact path='/send-new-reco/books' component={Books}/>
                  <PrivateRoute exact path='/searchFriends' component={Users}/>
                  <PrivateRoute exact path='/friends' component={Friends}/>
                  </Switch>
        </BrowserRouter> 
    </Provider>
)}


export default App
