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


function Login({ history }) {

  return (
    <>
      <h1>Login</h1>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}

        onSubmit={async (values, { setSubmitting }) => {
          const { data } = await axios.post('/api/login', {
            email: values.email,
            password: values.password
          })

          if (localStorage) {
            localStorage.setItem('token', data.token)
          }

          history.push('/')

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            console.log(data.token)
            setSubmitting(false)
          }, 400)
        }}
      >

        <Form>
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="penelope@gmail.com"
          />

          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="******"
          />

          <button type="submit">Submit</button>

        </Form>
      </Formik>
    </>
  )
}

export default Login