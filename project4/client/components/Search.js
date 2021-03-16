import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Search() {
  const [posts, updatePosts] = useState([])
  const [loading, updateLoading] = useState(true)
  const [level, updateLevel] = useState('')
  const [apiUrl, setApiUrl] = useState('/api/posts')
  const [tof, setTof] = useState('all')
  const [option, setOption] = useState([])
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



  function getStudents() {
    return posts.filter(student => student.is_offer !== true)

  }
  function getTeachers() {
    return posts.filter(student => student.is_offer === true)
  }

  if (loading) {
    return <>
      <h1>Loading posts...</h1>
    </>
  }
  function filtering(tof) {
    if (tof === 'teachers') {

      setOption(getTeachers())

    } else if (tof === 'students') {

      setOption(getStudents())
    } else {

      setOption(posts)
    }
  }
  return <div className='hero mb-4 home'>
    <h1 className='title brandfont is-size-2 mt-4 ml-4 has-text-centered has-text-white'>Posts</h1>
    <div className='columns is-mobile is-centered'>
      <select className='dropdown is-hoverable is-centered mr-1' onChange={(event) => {
        setApiUrl(`/api/posts/language/${event.target.value}`)
      }}>
        <option value='1'>English</option>
        <option value='2'>Spanish</option>
        <option value='3'>French</option>
        <option value='4'>Arabic</option>
        <option value='5'>Mandarin</option>
        <option value='6'>Hebrew</option>
      </select>
      <select className='dropdown is-hoverable is-centered ml-1' onChange={(e) => {
        setTof(e.target.value)
      }}>
        <option value='all'>Teachers and student requests</option>
        <option value='teachers'>Looking for Teacher</option>
        <option value='students'>Looking for a student</option>
      </select>
      <select className='dropdown is-hoverable is-centered mr-1 ml-1' onChange={(event) => {
        updateLevel(event.target.value)
      }}>
        <option value="">Select a level</option>
        <option value="1">Beginner (Level 1)</option>
        <option value="2">Intermediate (Level 2)</option>
        <option value="3">Advanced (Level 3)</option>
      </select>
    </div>
    <button onClick={() => filtering(tof)}>submit</button>
    <div className='container'>

      {option.map((post) => {
        return <Link key={post.id} to={`/post/${post.id}`}>
          <div className="card rows mt-4 p-3">

            <h2 className='title is-size-3 brandfont'>{post.title}</h2>
            <h4>Level: {post.level}</h4>
            <h5>Posted by {post.user.first_name}</h5>

          </div>
        </Link>
      })
      }
    </ div>
  </div >


}

export default Search