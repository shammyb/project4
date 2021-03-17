import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TestPost({ match }) {
  const userId = match.params.user_id
  // const token = localStorage.getItem('token')
  const [content, setComment] = useState('')
  // const id = match.params.post_id
  
  const [userPosts, updateUserPosts] = useState([])
  const [loading, updateLoading] = useState(true)
  // const loggedIn = getLoggedInUserId()
  const [editNumber, updateEditNumber] = useState(0)
  const [commentIdentifier, updateCommentIdentifier] = useState('')

  //const [error, updateError] = useState(false)

  useEffect(() => {
  async function fetchData() {
    await axios.get(`/api/posts`)
      .then(({ data }) => {
        const allPostsData = data
          const filteredPosts = allPostsData.filter(item => {
            console.log(item.user.id)
            if (item.user.id === userId) {
              return item
            }
          })
        updateUserPosts(filteredPosts)
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
  <h1>test</h1>
  <div className='container'>
      {userPosts.map((post) => {
        return <Link key={post.id} to={`/post/${post.id}`}>
          
            <div><h2 className='title is-size-4 brandfont has-text-centered' id='olive-green-text'>{post.title}</h2></div>
            
   
        </Link>
      })
      }
    </ div>
</div>
}

export default TestPost