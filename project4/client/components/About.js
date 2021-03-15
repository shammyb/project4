import React from 'react'
// import React, { useState } from 'react'
// import axios from 'axios'

function About() {

  return <div>
    <section className="hero is-info is-medium is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1></h1>
          <h1 className="title has-text-centered">
            About Us
          </h1>
        </div>
      </div>
    </section>
    <div className="column is-8 is-offset-2" >
      <div className="card article">
        <div className="card-content">
          <div className="content article-body">
            <p>We are three General Assembly Students completing this for our final project for the Software Engineering Immersive Course. </p>
            <h3 className="has-text-centered">Technologies Used</h3>
            <ul>
              <li>HTML</li>
              <li>SCSS</li>
              <li>Python</li>
              <li>React</li>
              <li>PostgreSQL</li>
              <li>Bulma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>




}

export default About