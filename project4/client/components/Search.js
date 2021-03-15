import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Search() {
  const [posts, updatePosts] = useState([])
  const [loading, updateLoading] = useState(true)

  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get('/api/posts')
        updatePosts(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [])


  if (loading){
    return <>

      <h1>Loading posts...</h1>
    </>
  }

  return <div className='block mb-4'> 
  
    <h1 className='title brandfont is-size-2 mt-4 ml-4'>Posts</h1>
    <div className='container'>
      {posts.map((post) => {
        return <Link key={post.id} to={`/post/${post.id}`}>
          <div className="card rows mt-4 p-3">
            
            <h2 className='title is-size-3 brandfont'>{post.title}</h2>
            <h4>Level: {post.level}</h4>
            
          </div>
        </Link>
      })
      }
    </ div>
  </div>
  

}

export default Search