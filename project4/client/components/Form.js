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

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

function NewForm({ history }) {


  return (
    <>
      <h1>Make a new post</h1>

      <Formik
        initialValues={{
          title: '',
          level: '',
          dialect: '',
          is_offer: false,
          availability: '',
          description: '',
          language_id: ''
        }}

        validationSchme={Yup.object({
          title: Yup.string()
            .min(5, 'Must be at least 5 characters')
            .max(25, 'Maximum of 25 characters')
            .required('Required'),
          level: Yup.number()
            .positive()
            .integer(),
          dialect: Yup.string()
            .min(6, 'Must be at least 6 characters'),
          is_offer: Yup.boolean()
            .required('Required'),
          availability: Yup.string()
            .max(30, 'Maximum 30 characters'),
          description: Yup.string()
            .min(10, 'Minimum 10 characters')
            .max(250, 'Maximum of 250 characters'),
          languages_id: Yup.string()
            .oneOf(
              ['Arabic', 'English', 'French', 'Hebrew', 'Mandarin', 'Spanish'],
              'Invalid language'
            )
            .required('Required')
        })}


        // headers: { Authorization: `Bearer ${token}` }
        onSubmit={async (values, { setSubmitting }) => {
          const { data } = await axios.post('/api/posts', {
            title: values.title,
            level: values.level,
            dialect: values.dialect,
            is_offer: values.is_offer,
            availability: values.availability,
            description: values.description,
            language_id: values.language_id
          })
          history.push('/posts')

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >

        <Form>
          <MyTextInput
            label="Title"
            name="title"
            type="text"
            placeholder="A short description of what you're looking for"
          />

          <MyTextInput
            label="Level"
            name="level"
            type="text"
            placeholder="What level are you looking for: beginner, middle or advanced?"
          />

          <MyTextInput
            label="Dialect"
            name="dialect"
            type="text"
            placeholder="For example, Argentinian Spanish or Gulf Arabic"
          />

          <div className="checkbox-container">
            <label>Check below if you are wish to be the teacher</label>
            <MyCheckbox name="checkbox">
              I'll teach!
            </MyCheckbox>
          </div>

          <MyTextInput
            label="Availability"
            name="availability"
            type="text"
            placeholder="When do you have time for class?"
          />

          <MyTextInput
            label="Description"
            name="description"
            type="text"
            placeholder="Describe what you're looking for!"
          />

          <MySelect label="Language" name="language_id">
            <option value="">Select a language</option>
            <option value="1">English</option>
            <option value="2">Spanish</option>
            <option value="3">French</option>
            <option value="4">Arabic</option>
            <option value="5">Mandarin</option>
            <option value="6">Hebrew</option>
          </MySelect>


          <button type="submit">Submit</button>

        </Form>

      </Formik>



    </>
  )


}

export default NewForm