import React, { useState, useEffect} from 'react'
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

function UpdatePost({ history, match }) {
  const token = localStorage.getItem('token')
  const [error, updateError] = useState('')
  const [formSuccess, updateFormSuccess] = useState(false)
  const [errorState, updateErrorState] = useState(false)
  const id = match.params.post_id
  const [ownerId, updateOwnerId] = useState('')
  const [formData, updateFormData] = useState({
    title: '',
    level: '',
    dialect: '',
    is_offer: false,
    availability: '',
    description: '',
    language_id: ''
  })
  const [post, setPost] = useState({})



  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(({ data }) => {
        updateOwnerId(data.user.id)
        const newFormData = {
          title: data['title'],
          level: data['level'],
          dialect: data['dialect'],
          is_offer: data['is_offer'],
          availability: data['availability'],
          description: data['description'],
          language_id: data['language_id']
        }
        updateFormData(newFormData)
        setPost(data)
      })

  }, [])


  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  function handleDeletePost(event) {
    const token = localStorage.getItem('token')
    event.preventDefault()

    try {
      axios.delete(`/api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
        .then(resp => {
          history.push('/search')
        })

    } catch (err) {
      
      
    }
  }
  return (
    <>

      <Formik
      enableReinitialize={true}
        initialValues={formData}

        validationScheme={Yup.object({
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


        onSubmit={async (values, { setSubmitting }) => {
          const token = localStorage.getItem('token')

          const { data } = await axios.put(`/api/posts/${id}`, {
            title: values.title,
            level: values.level,
            dialect: values.dialect,
            is_offer: values.is_offer,
            availability: values.availability,
            description: values.description,
            language_id: values.language_id

          },
            {
              headers: { Authorization: `Bearer ${token}` }
            })

          history.push('/search')

          console.log(values, 'woooooo')

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >

        <section className="form-container brandfont">
          <Form>
            <p className="title">Edit Post</p>

            <div className="field">
              <MyTextInput
                label="Title*"
                name="title"
                type="text"
                placeholder="Brief summary of your needs"
                className="input"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            {/* <div className="checkbox-container"> */}
            <div className="field">
              <label>Check if you wish to be the teacher*</label>
              <MyCheckbox name="checkbox">
                I'll teach!
              </MyCheckbox>
            </div>

            {/* <div className="select-field"> */}
            <div className="field">
              <label>Language*</label>
              <MySelect name="language_id" className="brandfont">
                <option value="">Select a language</option>
                <option value="1">English</option>
                <option value="2">Spanish</option>
                <option value="3">French</option>
                <option value="4">Arabic</option>
                <option value="5">Mandarin</option>
                <option value="6">Hebrew</option>
                onChange={handleChange}
                value={formData.language_id}
              </MySelect>
            </div>

            <div className="field">
              <label>Level*</label>
              <MySelect name="level" className="brandfont">
                <option value="">Select a level</option>
                <option value="1">Beginner</option>
                <option value="2">Intermediate</option>
                <option value="3">Advanced</option>
                onChange={handleChange}
                value={formData.level}
              </MySelect>
            </div>

            <div className="field">
              <MyTextInput
                label="Dialect"
                name="dialect"
                type="text"
                placeholder="For example, Argentinian Spanish or Gulf Arabic"
                className="input"
                onChange={handleChange}
                value={formData.dialect}
              />
            </div>


            <div className="field">
              <MyTextInput
                label="Availability"
                name="availability"
                type="text"
                placeholder="When do you have time for class?"
                className="input"
                onChange={handleChange}
                value={formData.availability}
              />
            </div>

            <div className="field">
              <MyTextInput
                label="Description"
                name="description"
                type="text"
                placeholder="Describe what you're looking for!"
                className="input"
                onChange={handleChange}
                value={formData.description}
              />
            </div>


            <button

              type="submit"
              className="button is-warning brandfont"
            >Submit</button>

            <button className="button is-danger mt-5" onClick={handleDeletePost}>Delete Post</button>
            
          </Form>

          <div className="form-instructions">
            <h1>How to fill out this form:</h1>

            <div className="form-instruction">
              <ul>Fields marked with * are required</ul>
            </div>

            <div className="form-instruction">
              <ul>Title</ul>
              <li>Write a short description of what you are looking for. This will be the first thing potential students/teachers see!</li>
            </div>

            <div className="form-instruction">
              <ul>Checkbox</ul>
              <li>If you are offering your services as a teacher, check this box so that you're information can be properly filtered</li>
            </div>

            <div className="form-instruction">
              <ul>Language</ul>
              <li>What language you wish to learn/teach</li>
            </div>

            <div className="form-instruction">
              <ul>Level</ul>
              <li>If you are offering your services as a teacher, please choose the level you feel most comfortable teaching</li>
              <li>If you are looking to learn, please choose which level you would like to start at</li>
            </div>

            <div className="form-instruction">
              <ul>Dialect</ul>
              <li>Have a particular dialect in mind? Include it here</li>
            </div>

            <div className="form-instruction">
              <ul>Availability</ul>
              <li>When do you have time for class? Be as specific as you can!</li>
            </div>

            <div className="form-instruction">
              <ul>Description</ul>
              <li>Is there any additional pertinent information you want to add? Include it here!</li>
            </div>
          </div>


        </section>
      </Formik>




    </>

  )


}

export default UpdatePost