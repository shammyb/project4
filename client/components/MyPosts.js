import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MyPosts({ match }) {
  const id = match.params.user_id

  const [posts, updatePosts] = useState([])
  const [userPosts, updateUserPosts] = useState([])
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

  console.log(typeof (id))

  function getUserPosts(id) {
    const aaa = []
    for (let i = 0; i < posts.length; i++) {
      if (parseInt(posts[i].user.id) === parseInt(id)) {
        aaa.push(posts[i])
      }
    }
    updateUserPosts(aaa)
  }

  if (loading) {
    return <>
      <h1>Loading posts...</h1>
    </>
  }

  return <div className='hero post-background pb-5'>
    <div className='box column is-half pt-5 pb-5 px-5 mt-5'>
      <h1>My Posts</h1>
      <h3>Get ready to explore the world from the comfort of your own home.</h3>
      <br />
      <button className='button is-warning brandfont is-centered' id='search-button' onClick={() => getUserPosts(id)}>Get your posts</button>
    </div>
    <div className='container'>
      {userPosts.map((post) => {

        return <Link key={post.id} to={`/post/${post.id}`}>
          <div className="card rows mt-4 p-3">

            <div><h2 className='title is-size-4 brandfont has-text-centered' id='olive-green-text'>{post.title}</h2></div>
            <br />
            
            
            <div className='is-centered' id="card-info">
              <h4 className='brandfont has-text-centered'>{post.dialect}</h4>
              <h4 className='brandfont has-text-centered '>Level: {post.level}</h4>
            </div>
          </div>
        </Link>
      })
      }
    </ div>
  </div >
}

export default MyPosts