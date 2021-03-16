import React from 'react'
import 'bulma'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className='pt-3 pb-3 px-6'>
    <Link className='level-right brandfont' id='olive-green-text' to={'/about'}>About Us</Link>
    <p className='level-right brandfont'>&copy; Language Connect 2021</p>
  </footer>
}