import React from 'react'
import 'bulma'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className='pt-3 pb-3 px-6'>
    <Link className='level-right has-text-white' to={'/about'}>About Us</Link>
    <p className='level-right has-text-white'>&copy; Language Connect 2021</p>
  </footer>
}