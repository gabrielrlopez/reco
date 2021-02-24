import { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Home from './components/layout/Home'
import Landing from './components/layout/Landing'
import Books from './components/layout/Books'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//Redux
import {Provider} from 'react-redux'
import store from './store'

const App = () => (
    <Provider store={store}>
        <Navbar />
        <Alert />
        <BrowserRouter>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/profile' component={Login}/>
              <Route exact path='/books' component={Books}/>
        </BrowserRouter>
    </Provider>
)
export default App;
