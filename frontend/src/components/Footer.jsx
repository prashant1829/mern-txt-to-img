import React from 'react'
import '../css/Footer.css'

const Image = () => {
  return (
    <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Imaginate.Created by Prashant Singh.</p>
  </footer>
  )
}

export default Image