import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {

  return (
    <footer>
      <div className="rights">
        Copyright &copy; 2023 - {(new Date().getFullYear())} <Link to="/" style={{ color: 'white', 'text-decoration': 'none' }}>AdarshPortfolio</Link> | All rights reserved
      </div>
    </footer>
  )
}

export default Footer