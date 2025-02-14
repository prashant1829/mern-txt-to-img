import React from 'react'
import {Link} from 'react-router-dom';
import '../css/Navbar.css'

const Navbar = () => {
    return(
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <Link class="navbar-brand gradient-text mx-auto" to="#">Imaginate</Link>
  </div>
</nav>
    )
}

export default Navbar