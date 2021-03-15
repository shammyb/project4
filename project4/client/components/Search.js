import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Search() {
  const [posts, updatePosts] = useState([])
  const [loading, updateLoading] = useState(true)
  const [apiUrl, setApiUrl] = useState('/api/posts')
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(apiUrl)
        updatePosts(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [apiUrl])


  if (loading) {
    return <>

      <h1>Loading posts...</h1>
    </>
  }

  return <div className='block mb-4'>
    <div>

    </div>
    <h1 className='title brandfont is-size-2 mt-4 ml-4'>Posts</h1>
    <div className='columns is-mobile is-centered'>
      <select className='dropdown is-hoverable is-centered mr-4'>
        <option value='1'>English</option>
        <option value='2'>Spanish</option>
        <option value='3'>French</option>
        <option value='4'>Arabic</option>
        <option value='5'>Mandarin</option>
        <option value='6'>Hebrew</option>
      </select>
      <select className='dropdown is-hoverable is-centered ml-4'>
        <option>Looking for Teacher</option>
        <option>Looking for a student</option>
      </select>
    </div>
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