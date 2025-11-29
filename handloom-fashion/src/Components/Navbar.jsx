import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ cartCount }) {
  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f4f4f',
        padding: '15px',
        color: 'white'
      }}
    >
      <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>
        Handloom<span style={{ color: '#f4c430' }}>Fashion</span>
      </h2>
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          gap: '20px',
          padding: 0,
          margin: 0
        }}
      >
        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link></li>
        <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart 🛒 ({cartCount})</Link></li>
        <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
        <li><Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Tools</Link></li>
        <li><Link to="/user" style={{ color: 'white', textDecoration: 'none' }}>User Tools</Link></li>
        <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
      </ul>
    </nav>
  )
}
