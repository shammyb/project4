import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

function Post({ match }) {
  const token = localStorage.getItem('token')
  const [content, setComment] = useState('')
  const id = match.params.post_id
  const [post, updatePost] = useState([])
  const [loading, updateLoading] = useState(true)
  const loggedIn = getLoggedInUserId()
  const [editNumber, updateEditNumber] = useState(0)
  const [commentIdentifier, updateCommentIdentifier] = useState('')

  //const [error, updateError] = useState(false)


  async function fetchData() {
    await axios.get(`/api/posts/${id}`)
      .then(({ data }) => {
        updatePost(data)
        updateLoading(false)
      })

  }

  useEffect(() => {

    fetchData()
  }, [])

  async function handleComment() {

    await axios.post(`/api/posts/${id}/comments`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setComment('')
    fetchData()



  }
  async function handleDeleteComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`/api/posts/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        updatePost(resp.data)
      })
  }
  function handleEditCommentOne(commentId) {
    if (!isCreator) {
      return null
    }
    for (let i = 0; i < post.post_comments.length; i++) {
      if ((post.post_comments[i].id) === commentId) {
        setComment(post.post_comments[i].content)

      }
    }

    updateEditNumber(1)
    updateCommentIdentifier(commentId)
  }
  async function handleEditCommentTwo() {
    if (!isCreator) {
      return null
    }
    await axios.put(`/api/posts/${id}/comments/${commentIdentifier}`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    updateEditNumber(0)
    setComment('')
    updateCommentIdentifier('')
    fetchData()

  }
  // await axios.post(`/api/posts/${id}/comments`, { content }, {
  //   headers: { Authorization: `Bearer ${token}` }
  // })

  // setComment('')
  // fetchData()

  if (loading) {
    return <>
      <h1>Loading posts...</h1>
    </>
  }
  return <div className='hero post-background'>
    <div className='px-6 pt-6 pb-6 mb-3'>
      <div className='columns'>
        <div className='column'>
        <div className='box is-centered post-info'>
          <h2 className='title brandfont is-size-3 mb-1 mt-4' id='olive-green-text'>{post.title}</h2>
          <br />
          <h5 className='brandfont pb-3'><span id='olive-green-text'>Level:</span> {post.level} </h5>
          
          <h5 className='brandfont pb-3'><span id='olive-green-text'>Dialect:</span> {post.dialect}</h5>
          <p className='brandfont pb-3'><span id='olive-green-text'>Description:</span> {post.description}</p>

          <p className='brandfont pb-3'><span id='olive-green-text'>Availability:</span> {post.availability}</p>
          <div className='box px-6 pt-5 pb-3 mt-4 text-is-centered meet-user' id='olive-background'>
            <h4 className='title brandfont' id='gold-text'>Meet {post.user.first_name}</h4>
            <p className='brandfont has-text-white'>{post.user.bio}</p>
            <br />
            <p className='brandfont has-text-white'>Timezone: {post.user.time_zone}</p>
            <br />
            <p className='brandfont has-text-white'>(Remember to consider your time differences when planning lessons!)</p>
            <br />
            {isCreator(post.user.id) ?
            <Link className='button mb-4 is-warning' to={`/updatepost/${post.id}`}>Edit post</Link>
            :
            <a className='button mb-4 is-warning' href={`mailto:${post.user.email}`}> Contact {post.user.first_name} </a>
          }
          </div>
          </div>
      
          <div>
            <div>
              <div className="box is-centered post-info">
                <h2 className="title is-2 brandfont" id='olive-green-text'>Share your experiences with {post.user.username} </h2>
                <div className="column">
                  <div className="is-multiline is-centered" margin='0 auto'>
                    {
                      post.post_comments && post.post_comments.map((commenting, index) => {
                        return <article key={index} className="media">
                          <div className="media-content">
                            <div className="content">
                              <p className="subtitle">
                                {commenting.user.username} says:
                              </p>
                              <p>{commenting.content}</p>
                            </div>
                          </div>
                          {isCreator(commenting.user.id) && <div className="media-right">
                            <button
                              className="button is-danger"
                              onClick={() => handleDeleteComment(commenting.id)}>
                              Delete
                            </button>
                          </div>}
                          {isCreator(commenting.user.id) && <div className="media-right">
                            <button
                              className="button is-light"
                              onClick={() => handleEditCommentOne(commenting.id)}>Update
                            </button>
                          </div>}
                        </article>
                      })
                    }


                    {loggedIn && <article className="media">
                      <div className="media-content">
                        <div className="field" >
                          <p className="control">
                            <textarea
                              className="textarea"
                              placeholder="make a comment"
                              onChange={event => setComment(event.target.value)}
                              value={content}
                            >
                              {content}
                            </textarea>
                          </p>
                        </div>
                        <div className="field">
                          <p className="control">
                            {editNumber === 0 && <button
                              onClick={handleComment}
                              className="button is-warning"
                              
                            >
                              Submit
                            </button>}
                            {editNumber === 1 && <button
                              onClick={handleEditCommentTwo}
                              className="button is-info"
                            >
                              Update Comment
                            </button>}
                          </p>
                        </div>
                      </div>
                    </article>}

                  </div>



                </div>
                {!loggedIn && <article className="message is-danger">
                  <div className="message-header">
                    <p>Not logged in!</p>

                  </div>
                  <div className="message-body">
                    <strong>You need to be logged in to make a comment!</strong>
                  </div>
                </article>
                }</div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
}

export default Post