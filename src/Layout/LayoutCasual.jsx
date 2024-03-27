import React from 'react'
import Navbar from '../components/navBar/Navbar'
import Casual from './../Pages/Browse/Casual';
import Footer from '../components/Footer/Footer';

const LayoutCasual = () => {
  return (
    <div>
        <Navbar />
        <Casual />
        <Footer />
    </div>
  )
}

export default LayoutCasual