//import React from 'react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

function Home() {


  return <section className='hero home is-fullheight-with-navbar columns'>
    <div className='hero-body column is-centered'>
      <div className='box column is-half pt-5 pb-5 px-5'>
        <h1 className='title brandfont is-size-2' id='olive-green-text'>
          Learn a new skill while making friends all over the world!</h1>
        <div className="content article-body">
          <h3 className="brandfont">How does it work?</h3>
          <p className="brandfont">At Language Connect, we believe in the importance of accessible and quality skill building. Simply register and create an account. Post the language you want to learn or the language you are able to teach. Search for the language you are interested and email the person who posted the request! Leave reviews and comments on your favourite teacher&apos;s posts!</p>
          <Link className='button is-warning brandfont has-text-black' to='/Search'>Search Languages!</Link>
        </div>
      </div>
    </div>
  </section>


}

export default Home