import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div className='box px-6 pt-6 pb-6'>
      <div className='columns'>
        <div className='column'>
          <h2 className='title brandfont has-text-info is-size-3 mb-1 mt-4'>{post.title}</h2>

          <h5 className='brandfont has-text-info'>Level: {post.level}</h5>
          <h5 className='brandfont has-text-info'>Dialect: {post.dialect}</h5>
          <p className='brandfont has-text-info'>Description: {post.description}</p>
          <p className='brandfont has-text-info'>Availability: {post.availability}</p>
          {/* <p>Place type: {property.isEntirePlace ? 'Entire place' : 'Room only'} </p>

          <p>Check in: {property.checkInTime}</p>
          <p>Check out: {property.checkOutTime}</p>
          <p>{property.houseRules}</p>

          <h5 className='title brandfont has-text-info is-size-3 mb-1 mt-4'>Amenities</h5>
          {property.amenities.length > 0 &&
            property.amenities.map((amenity, index) => {
              return <p key={index}>
                {amenity.amenityValue ?
                  <i className='fas fa-check-circle mr-2'></i>
                  :
                  <i className='fas fa-times-circle mr-2'></i>}
                {amenity.amenityName}
              </p>
            })
          } */}
        </div>
      </div>
    </div>
  </div>
}

export default Post