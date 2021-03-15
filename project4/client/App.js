// ! TO DO
// * Translation library 
// * Nail down color palette
// * Nail down styling framework
// * Double check all controllers work 
// * Booking via mailto links
// * User ratings 
// * Pagination
// * cloudinary (or one image for each language) 

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
import 'bulma'
// COMPONENT IMPORTS
import NavBar from './components/NavBar.js'
import About from './components/About.js'
import Post from './components/Post.js'
import Form from './components/Form.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import PrivateProfile from './components/PrivateProfile.js'
import Register from './components/Register.js'
import Search from './components/Search.js'
import UserProfile from './components/UserProfile.js'
import Footer from './components/Footer.js'

const App = () => (
  <BrowserRouter>
    <NavBar></NavBar>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/test/backend" component={TestBackend} /> */}
      <Route exact path="/about" component={About} />
      <Route exact path="/post/:post_id" component={Post} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/privateprofile" component={PrivateProfile} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/userprofile" component={UserProfile} />
    </Switch>
    <Footer />
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