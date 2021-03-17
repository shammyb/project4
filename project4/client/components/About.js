import React from 'react'
// import React, { useState } from 'react'
// import axios from 'axios'

function About() {

  return <div>
    <section className="hero is-info is-medium is-bold">
      <div className="hero-body post-background">
        <div className="container has-text-centered">
          <h1></h1>
          <h1></h1>
          <h1 className="title has-text-centered ">
            About Us
          </h1>
        </div>
      </div>
    </section>
    <div className="column is-8 is-offset-2" >
      <div className="box article">
        <div className="box-content">
          <div className="content article-body">
            <p>We are three General Assembly Students completing this for our final project for the Software Engineering Immersive Course. </p>
            <div className='container is-centered' margin='0 auto'>
              <div className='card'>
                Benjamin Shamash
                (linkedin)
                (github)
              </div>
              <div className='card'>
                Katherine Herbert
                (linkedin)
                (github)
              </div>
              <div className='card'>
                Emily Kulesa
                (linkedin)
                (github)
              </div>

            </div>
            <h3 className="has-text-centered">Technologies Used</h3>
            <ul>
              <li>HTML</li>
              <li>SCSS</li>
              <li>Python</li>
              <li>React</li>
              <li>PostgreSQL</li>
              <li>Bulma</li>
              <li>Formik</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>




}

export default About