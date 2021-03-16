import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getLoggedInUserId } from '../lib/auth.js'
import axios from 'axios'

function Navbar({ history }) {
  function handleLogout() {
    localStorage.removeItem('token') 
    history.push('/')
  }

  const loggedIn = getLoggedInUserId()


  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className='navbar-brand'>
      <div className='navbar-item'>
        <Link to='/'>
          <h1 className='title brandfont is-size-2 has-text-white'>Language Connect</h1>
        </Link>
      </div>
    </div>
    <div className="navbar-end">

      {loggedIn &&
        <div className="navbar-item">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link"></a>

            <div className="navbar-dropdown">
              <p className="navbar-item tag">{loggedIn.first_name}</p>
              {/* <Link className="navbar-item" to={`/profile/${loggedInUser._id}`}>
                Profile
              </Link> */}
            </div>
          </div>
        </div>}
      <div className="navbar-item">
        <div className="buttons">
          {loggedIn.length === 0 &&
            <Link className="button is-warning" to={'/login'}>
              Log in
            </Link>}
          {loggedIn.length === 0 &&
            <Link className="button is-light" to={'/signup'}>
              <strong>Sign up</strong>
            </Link>}
          {loggedIn.id &&
            <button className="button is-warning" onClick={logout}>Sign Out</button>}
        </div>
      </div>
    </div>
  </nav>
}

export default withRouter(Navbar)


// import React, { useEffect, useState } from 'react'
// import { Link, withRouter } from 'react-router-dom'
// import axios from 'axios'
// import { getLoggedInUserId } from '../lib/auth.js'


// function NavBar({ location }) {
//   const [username, updateUsername] = useState('')
//   const LoggedInUserId = getLoggedInUserId()
//   const token = localStorage.getItem('token')

//   useEffect(() => {
//     async function fetchData() {
//       // LoggedInUserId = getLoggedInUserId()
//       console.log(LoggedInUserId, 'allliiiiiii')

//       if (LoggedInUserId) {
//         try {
//           const { data } = await axios.get(`/api/profile/${LoggedInUserId}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//           if (data) {
//             console.log(data.token, 'heyyyyy')
//             updateUsername(data.first_name)
//           }
//         } catch (err) {
//           console.log(err)
//         }
//       }
//     }
//     fetchData()
//   }, [location])

//   console.log(username, 'hellooooooo')

//   function logOut() {
//     localStorage.clear()
//     updateUsername('')
//     history.push('/')
//   }

//   return <nav className='navbar' role='navigation' aria-label='main navigation'>
//     <div className='navbar-brand'>
//       <div className='navbar-item'>
//         <Link to='/'>
//           <h1 className='title brandfont is-size-2 has-text-white'>Language Connect</h1>
//         </Link>
//       </div>
//     </div>
//     <div className='navbar-end'>
//       <div className='navbar-item'>
//         {username && <div className='buttons has-text-white'>
//           {/* <div className='navbar-item has-text-white'>
//             <Link className='button is-primary' to='/form'>Create New Post</Link>
//           </div> */}
//           <div className='navbar-item has-text-white'>
//             <i className='fas fa-user-circle fa-lg mr-2'></i>
//             <div>Logged in as
//               <Link
//                 className='link-hover-grey-light is-link'
//                 to={`/users/${LoggedInUserId}`}>
//                 {username}
//               </Link>
//             </div>
//           </div>
//           <div className='navbar-item has-text-white'>
//             <a onClick={logOut} className='link-hover-grey-light is-clickable is-link'>Log out</a>
//           </div>
//         </div>
//         }
//         {!username && <div className='buttons has-text-white'>
//           <Link className='button is-primary' to='/register'>Register</Link>
//           <Link className='button is-primary' to='/login'>Login</Link>
//         </div>
//         }
//       </div>
//     </div>
//   </nav>
// }
// export default withRouter(NavBar)