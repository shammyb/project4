import React from 'react'
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

// const MyCheckbox = ({ children, ...props }) => {
//   const [field, meta] = useField({ ...props, type: 'checkbox' })
//   return (
//     <div>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   )
// }


// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props)
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   )
// }


function SignUp({ history }) {

  return (
    <>

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          first_name: '',
          bio: '',
          time_zone: '',
          languages_spoken: ''
        }}

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
          const { data } = await axios.post('/api/signup', {

            username: values.username,
            email: values.email,
            password: values.password,
            first_name: values.first_name,
            bio: values.bio,
            time_zone: values.time_zone
          })

          history.push('/login')

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >

        <section className="form-container brandfont">
          <Form>
            <p className="title">Sign Up!</p>

            <div className="field">
              <MyTextInput
                label="First Name"
                name="first_name"
                type="text"
                placeholder="Penelope"
                className="input"
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Username"
                name="username"
                type="text"
                placeholder="PenelopeC1982"
                className="input"
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="penelope@gmail.com"
                className="input"
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="******"
                className="input"
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Biography"
                name="bio"
                type="text"
                placeholder="Hi! I'm Penelope. I am from the United States and am a native English and Spanish speaker. I like movies, dogs and cooking."
                className="input"
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Time Zone"
                name="time_zone"
                type="text"
                placeholder="EST"
                className="input"
              />
            </div>

            <button type="submit" className="brandfont">Submit</button>

          </Form>
        </section>
      </Formik>



    </>
  )


}

export default SignUp