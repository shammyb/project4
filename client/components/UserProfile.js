import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}



function UserProfile({ match, params, history }) {
  const id = match.params.user_id
  const [userData, updateUserData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    bio: '',
    time_zone: '',
    languages_spoken: ''
  })

  const [userDataLoading, updateUserDataLoading] = useState(true)

  const [error, updateError] = useState('')
  const [errorState, updateErrorState] = useState(false)
  const [formSuccess, updateFormSuccess] = useState(false)

  const token = localStorage.getItem('token')

  function getUser() {
  
    axios.get(`/api/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {

        updateUserData(data)
        updateUserDataLoading(false)

      })
  }

  useEffect(() => {
    getUser()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateUserData({ ...userData, [name]: value })
  }

  function handleDeleteUser(event) {
    event.preventDefault()

    try {
      axios.delete(`/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          history.push('/')
        })

    } catch (err) {
      updateErrorState(true)
      updateError(err.response.data.message)
      updateFormSuccess(false)
    }
  }
  return (
    <>

      <Formik
        enableReinitialize={true}
        initialValues={userData}

        validationScheme={Yup.object({
          username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
          first_name: Yup.string()
            .required('Required'),
          bio: Yup.string()
            .max(250, 'Must be 250 characters or less')
            .required('Required'),
          time_zone: Yup.string()
            .min(3, 'Please use the three-character abbreviation')
          // languages_spoken: Yup.string()
          //   .oneOf(
          //     ['Arabic', 'English', 'French', 'Hebrew', 'Mandarin', 'Spanish'],
          //     'Invalid language'
          //   )
          //   .required('Required')
        })}

        //make async
        onSubmit={async (values, { setSubmitting }) => {
          console.log(id)
          console.log({
            'username': userData.username,
            'email': userData.email,
            'first_name': userData.first_name,
            'password': userData.password,
            'bio': userData.bio,
            'time_zone': userData.time_zone
          }, { headers: { Authorization: `Bearer ${token}` } })
          try {
            await axios.put(`/api/profile/${id}`,
              {
                'username': userData.username,
                'email': userData.email,
                'first_name': userData.first_name,
                'bio': userData.bio,
                'time_zone': userData.time_zone
              }, { headers: { Authorization: `Bearer ${token}` } })
            history.push('/search')
            console.log(values, 'woooooo')
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }
          catch (err) {
            console.log('aaaaaaa')
            console.log(err)
          }
        }}
      >


        <section className="form-container brandfont">
          <Form>
            <p className="title">Edit Profile</p>

            <div className="field">
              <MyTextInput
                label="First Name"
                name="first_name"
                type="text"
                
                className="input"
                onChange={handleChange}
                value={userData.first_name}
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Username"
                name="username"
                type="text"
                placeholder="PenelopeC1982"
                className="input"
                onChange={handleChange}
                value={userData.username}
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="penelope@gmail.com"
                className="input"
                onChange={handleChange}
                value={userData.email}
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="******"
                className="input"
                onChange={handleChange}
                value={userData.password}
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Biography"
                name="bio"
                type="text"
                placeholder="Hi! I'm Penelope. I am from the United States and am a native English and Spanish speaker. I like movies, dogs and cooking."
                className="input"
                onChange={handleChange}
                value={userData.bio}
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Time Zone"
                name="time_zone"
                type="text"
                placeholder="EST"
                className="input"
                onChange={handleChange}
                value={userData.time_zone}
              />
            </div>

            <button type="submit" className="button is-warning brandfont">Submit</button>
            <button className="button is-danger mt-5" onClick={handleDeleteUser}>Delete my account</button>
          </Form>
        </section>
      </Formik>



    </>
  )


}

export default UserProfile