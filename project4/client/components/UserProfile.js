import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserProfile({ history, match }) {
  // const userId = match.params.usersId
  // const [userData, updateUserData] = useState({
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   time_zone: '',
  //   languages_spoken: ''
  // })

  // const [userDataLoading, updateUserDataLoading] = useState(true)

  // const [error, updateError] = useState('')
  // const [errorState, updateErrorState] = useState(false)
  // const [formSuccess, updateFormSuccess] = useState(false)

  // const token = localStorage.getItem('token')

  // function getUser() {

  //   axios.get(`/api/users/${userId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(({ data }) => {

  //       updateUserData(data)
  //       updateUserDataLoading(false)

  //     })
  // }

  // useEffect(() => {
  //   getUser()
  // }, [])


  // function handleChange(event) {
  //   const { name, value } = event.target
  //   updateUserData({ ...userData, [name]: value })
  // }

  // async function handleSubmit(event) {
  //   event.preventDefault()

  //   try {
  //     const { data } = await axios.put(`/api/users/${userId}`, userData, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })

  //     getUser()
  //     updateErrorState(false)
  //     updateFormSuccess(true)
  //   } catch (err) {
  //     updateErrorState(true)
  //     updateError(err.response.data.message)
  //     updateFormSuccess(false)
  //   }
  // }

  // function handleDeleteUser(event) {
  //   event.preventDefault()

  //   try {
  //     axios.delete(`/api/users/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //       .then(resp => {
  //         history.push('/')
  //       })

  //   } catch (err) {
  //     updateErrorState(true)
  //     updateError(err.response.data.message)
  //     updateFormSuccess(false)
  //   }
  // }

  // if (userDataLoading) {
  //   return <div className='loading'>
  //     <img src='https://i.ibb.co/xDS2vQc/loading.gif' />
  //   </div>
  // }


  // return <div className="section">

  //   {errorState ? <div className="notification is-danger">{error}</div> : <div className="notification is-hidden"></div>}

  //   {formSuccess ? <div className="notification is-success is-light">You updated your profile!.</div> : <div className="notification is-hidden"></div>}

  //   <div className="columns">

  //     <div className="column">
  //       <h2 className='title is-2 mb-4'>User profile</h2>
  //       <form onSubmit={handleSubmit}>

  //         <div className="field">
  //           <label className="label">First name</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="text"
  //               value={userData.first_name}
  //               onChange={handleChange}
  //               name={'first_name'}
  //             />
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Last name</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="text"
  //               value={userData.last_name}
  //               onChange={handleChange}
  //               name={'last_name'}
  //             />
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Email</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="text"
  //               value={userData.email}
  //               onChange={handleChange}
  //               name={'email'}
  //             />
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Password</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="password"
  //               value={userData.password}
  //               onChange={handleChange}
  //               name={'password'}
  //             />
  //           </div>
  //         </div>
  //         <div className="field">
  //           <label className="label">Confirm Password</label>
  //           <div className="control">
  //             <input
  //               className="input"
  //               type="password"
  //               value={userData.passwordConfirmation}
  //               onChange={handleChange}
  //               name={'passwordConfirmation'}
  //             />
  //           </div>
  //           <div className="field">
  //             <label className="label mt-3">Bio</label>
  //             <div className="control">
  //               <input
  //                 className="input"
  //                 type="text"
  //                 value={userData.bio}
  //                 onChange={handleChange}
  //                 name={'bio'}
  //               />
  //             </div>
  //           </div>
  //           <div className="field">
  //             <label className="label mt-3">Languages Spoken</label>
  //             <div className="control">
  //               <input
  //                 className="input"
  //                 type="text"
  //                 value={userData.languages_spoken}
  //                 onChange={handleChange}
  //                 name={'languages_spoken'}
  //               />
  //             </div>
  //           </div>
  //           <div className="field">
  //             <label className="label mt-3">Timezone</label>
  //             <div className="control">
  //               <input
  //                 className="input"
  //                 type="text"
  //                 value={userData.time_zone}
  //                 onChange={handleChange}
  //                 name={'time_zone'}
  //               />
  //             </div>
  //           </div>

  //           <button className="button is-primary mt-5">Update my details</button>

  //         </div>
  //       </form>

  //       <button className="button is-danger mt-5" onClick={handleDeleteUser}>Delete my account</button>

  //     </div>


  //   </div>
  // </div>

}