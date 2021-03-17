import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paginate from './Paginate'
function Search() {
  const resultsPerPage = 10
  const [pageNum, updatePageNum] = useState(1)
  const [posts, updatePosts] = useState([])
  const [loading, updateLoading] = useState(true)
  const [level, updateLevel] = useState(0)
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
  function getStudents(level) {
    const filteredLevel = []
    const filteredPosts = posts.filter(student => student.is_offer !== true)
    if (level !== 0) {
      for (let i = 0; i < filteredPosts.length; i++) {
        if (parseInt(filteredPosts[i].level) === level) {
          filteredLevel.push(filteredPosts[i])
        }
      }
      return filteredLevel
    }
    return filteredPosts
  }
  function getTeachers(level) {
    const filteredLevel = []
    const filteredPosts = posts.filter(student => student.is_offer === true)
    if (level !== 0) {
      for (let i = 0; i < filteredPosts.length; i++) {
        if (parseInt(filteredPosts[i].level) === level) {
          filteredLevel.push(filteredPosts[i])
        }
      }
      return filteredLevel
    }
    return filteredPosts
  }
  function getAllPostsByLevel(level) {
    const filteredLevel = []
    if (level !== 0) {
      for (let i = 0; i < posts.length; i++) {
        if (parseInt(posts[i].level) === level) {
          filteredLevel.push(posts[i])
        }
      }
      return filteredLevel
    }
    return posts
  }
  if (loading) {
    return <>
      <h1>Loading posts...</h1>
    </>
  }
  function filtering(tof, level) {
    if (tof === 'teachers') {
      setOption(getTeachers(level))
    } else if (tof === 'students') {
      setOption(getStudents(level))
    } else {
      setOption(getAllPostsByLevel(level))
    }
  }
  // function handlePageChange(newValue) {
  //   updatePageNum(newValue)
  // }
  return <div className='hero mb-4 pb-4 home'>
    <h1 className='title brandfont is-size-2 mt-4 ml-4 has-text-centered has-text-white'>Posts</h1>
    <h2 className='is-size-4 mt-4 ml-4 has-text-centered has-text-white'>Find new international teachers and students today!</h2>
    <br />
    <div className='columns is-mobile is-centered'>
      <select className='dropdown is-hoverable is-centered mr-1 brandfont' id='dropdown-menu' onChange={(event) => {
        setApiUrl(`${event.target.value}`)
      }}>
        <option value='/api/posts'>All Languages</option>
        <option value='/api/posts/language/1'>English</option>
        <option value='/api/posts/language/2'>Spanish</option>
        <option value='/api/posts/language/3'>French</option>
        <option value='/api/posts/language/4'>Arabic</option>
        <option value='/api/posts/language/5'>Mandarin</option>
        <option value='/api/posts/language/6'>Hebrew</option>
      </select>
      <select className='dropdown is-hoverable is-centered ml-1 mr-1 brandfont' id='dropdown-menu' onChange={(e) => {
        setTof(e.target.value)
      }}>
        <option value='all'>Teachers and student requests</option>
        <option value='teachers'>Looking for Teacher</option>
        <option value='students'>Looking for a student</option>
      </select>
      <select className='dropdown is-hoverable is-centered mr-1 ml-1 brandfont' id='dropdown-menu' onChange={(event) => {
        updateLevel(parseInt(event.target.value))
      }}>
        <option value="0">Select a level</option>
        <option value="1">Beginner (Level 1)</option>
        <option value="2">Intermediate (Level 2)</option>
        <option value="3">Advanced (Level 3)</option>
      </select>
    </div>
    <button className='button is-warning brandfont' id='search-button' onClick={() => filtering(tof, level)}>Search</button>
    <div className='container'>
      {option.map((post) => {
        return <Link key={post.id} to={`/post/${post.id}`}>
          <div className="card rows mt-4 p-3">
            <div><h2 className='title is-size-4 brandfont has-text-centered' id='olive-green-text'>{post.title}</h2></div>
            <div className='is-centered' id="card-info">
              <h4 className='brandfont has-text-centered'>Level: {post.level}</h4>
              <h5 className='brandfont has-text-centered card-info'>Posted by <span id='olive-green-text'>{post.user.username}</span></h5>
            </div>
          </div>
        </Link>
      })
      }
    </ div>
  </div >
}
export default Search