import { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Books from './components/layout/Books'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => (
    <BrowserRouter>
          <Navbar />
          <Route exact path='/' component={Landing}/> 
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/books' component={Books}/>

    </BrowserRouter>
)
export default App;
