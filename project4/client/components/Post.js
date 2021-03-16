import React, { useState, useEffect } from 'react'
import axios from 'axios'
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth.js'
=======
import { isCreator } from '../lib/auth'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

>>>>>>> 4e08abcaf6a736498812731aec4bd5906daaf242
function Post({ match }) {
  const id = match.params.post_id
  const [post, updatePost] = useState([])
  const [loading, updateLoading] = useState(true)
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
            <p className='brandfont has-text-info'>Speaks: {post.user.languages_spoken}</p>
            <p className='brandfont has-text-info'>Timezone: {post.user.time_zone}</p>
            <a href={`mailto:${post.user.email}`}> Contact {post.user.first_name} </a>
          </div>
          {isCreator(post.user.id) ?
            <Link className='button is-primary mb-4' to={`/updatepost/${post.id}`}>Edit post</Link>
            :
            <a href={`mailto:${post.user.email}`}> Contact {post.user.first_name} </a>
          }
          <div>
            <h3>Comments to insert</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Post