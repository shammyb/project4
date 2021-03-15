import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Search() {
  const [posts, updatePosts] = useState([])
  const [loading, updateLoading] = useState(true)

  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get('api/posts')
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
      <img src='https://i.imgur.com/jKTJEFh.png'/>
      <h1>Loading posts...</h1>
    </>
  }

  return <div className='homepage'> 
    <h1 className='title'>Posts</h1>
    <div className='trendingdiv'>
      {posts.map((post) => {
        return <Link key={post.id} to={`/posts/${post.id}`}>
          <div className='trendingcard'>
            <h2>{post.title}</h2>
            <h4>Level: {post.level}</h4>
            <h4>Dialect: {post.dialect}</h4>
          </div>
        </Link>
      })
      }
    </ div>
  </div>
  

}

export default Search