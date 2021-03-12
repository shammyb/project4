// ! TO DO
// * Translation library 
// * Nail down color palette
// * Nail down styling framework
// * Double check all controllers work 
// * User ratings 
// * Pagination 

// ! STRETCH GOALS
// * Dark/light mode
// * Translation services 
// * Transferable points 
// * Messenger system 


// import React, { useEffect } from 'react'
// import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
// import axios from 'axios'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

// COMPONENT IMPORTS
import About from './components/About.js'
import Class from './components/Class.js'
import Form from './components/Form.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Offer from './components/Offer.js'
import PrivateProfile from './components/PrivateProfile.js'
import Register from './components/Register.js'
import Search from './components/Search.js'
import UserProfile from './components/UserProfile.js'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/test/backend" component={TestBackend} /> */}
      <Route exact path="/about" component={About} />
      <Route exact path="/class" component={Class} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/offer" component={Offer} />
      <Route exact path="/privateprofile" component={PrivateProfile} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/userprofile" component={UserProfile} />
    </Switch>
  </BrowserRouter>
)

// const Home = () => <Link to={'/test/backend'}>
//   Go to /hello/world page.
// </Link>

// // ! Just a little component to test that you can talk to your flask server, check if it
// // ! works in network tab.
// const TestBackend = () => {
//   useEffect(() => {
//     // ? This is going to try localhost:5000/api
//     axios.get('/api')
//       .then(({ data }) => console.log(data))
//   }, [])

//   return <p>
//     Hello World
//   </p>
// }

export default App