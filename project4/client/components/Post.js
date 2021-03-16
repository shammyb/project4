import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

function Post({ match }) {
  const token = localStorage.getItem('token')
  const [comment, setComment] = useState('')
  const id = match.params.post_id
  const [post, updatePost] = useState([])
  const [loading, updateLoading] = useState(true)
  const loggedIn = getLoggedInUserId()

  //const [error, updateError] = useState(false)
  console.log(match)
  useEffect(() => {

    async function fetchData() {
      await axios.get(`/api/posts/${id}`)
        .then(({ data }) => {
          updatePost(data)
          updateLoading(false)
        })

    }
    fetchData()
  }, [])

  async function handleComment() {
    const { data } = await axios.post(`/api/posts/${id}/comments`, { comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setComment('')
    updatePost(data)

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
  // function handleEditCommentOne(commentId){
  //   if (!isCreator) {
  //     return null
  //   }

  // }


  if (loading) {
    return <>
      <h1>Loading posts...</h1>
    </>
  }
  return <div>
    <div className='box px-6 pt-6 pb-6 mb-3'>
      <div className='columns'>
        <div className='column'>
          <h2 className='title brandfont has-text-info is-size-3 mb-1 mt-4'>{post.title}</h2>
          <h3 className='brandfont is-size-4'>Posted by: {post.user.username}</h3>
          <h5 className='brandfont has-text-info'>Level: {post.level}</h5>
          <h5 className='brandfont has-text-info'>Dialect: {post.dialect}</h5>
          <p className='brandfont has-text-info'>Description: {post.description}</p>

          <p className='brandfont has-text-info'>Availability: {post.availability}</p>
          <div className='box px-6 pt-6 pb-6 mt-4'>
            <h4 className='title brandfont has-text-info'>Meet the User: {post.user.first_name}</h4>
            <p className='brandfont has-text-info'>{post.user.bio}</p>
            <p className='brandfont has-text-info'>Timezone: {post.user.time_zone}</p>
            
          </div>
          {isCreator(post.user.id) ?
            <Link className='button is-primary mb-4' to={`/updatepost/${post.id}`}>Edit post</Link>
            :
            <a className='button is-secondary mb-4' href={`mailto:${post.user.email}`}> Contact {post.user.first_name} </a>
          }
          <div>
            {console.log('bbb' + JSON.stringify(post.post_comments))}
            {console.log('bbb' + JSON.stringify(post))}
            <div>
              <div className="container is-centered">
                <h2 className="title is-2">Share you experiences from {post.user.username} </h2>
                <div className="column">
                  <div className="columns is-multiline is-centered">
                    {
                      post.post_comments && post.post_comments.map(commenting => {
                        return <article key={id} className="media">
                          <div className="media-content">
                            <div className="content">
                              <p className="subtitle">
                                {commenting.user.username}
                              </p>
                              <p>{commenting.content}</p>
                            </div>
                          </div>
                          {isCreator(commenting.user.id) && <div className="media-right">
                            <button
                              className="button is-danger"
                              onClick={() => handleDeleteComment(commenting._id)}>
                              Delete
                            </button>
                          </div>}
                          {/* {isCreator(commenting.user._id) && <div className="media-right">
                            <button
                              className="button is-light"
                              onClick={() => handleEditCommentOne(commenting._id)}>Update
                            </button>
                          </div>} */}
                        </article>
                      })
                    }


                    {loggedIn && <article className="media">
                      <div className="media-content">
                        <div className="field" >
                          <p className="control">
                            <textarea
                              className="textarea"
                              placeholder="Share your experience..."
                              onChange={event => setComment(event.target.value)}
                              value={comment}
                            >
                              {comment}
                            </textarea>
                          </p>
                        </div>
                        <div className="field">
                          <p className="control">
                            {/* editNumber === 0 &&  */}
                            <button
                              onClick={handleComment}
                              className="button is-info"
                            >
                              Submit
                            </button>
                            {/* {editNumber === 1 && <button
                              onClick={handleEditCommentTwo}
                              className="button is-info"
                            >
                              Update Comment
                            </button>} */}
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