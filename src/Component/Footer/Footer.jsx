import React from 'react'
import './Footer.css'

function Footer() {

  return (
    <footer>
      <div className="rights">
        Copyright &#169; 2023 - {(new Date().getFullYear())} AdarshPortfolio | All rights reserved
      </div>
    </footer>
  )
}

export default Footer