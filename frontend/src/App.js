import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import './App.css';
import Content from './components/Content';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar/>
      <Content/>
      <Form/>
      <Footer/>
    </div>
  );
}

export default App;
