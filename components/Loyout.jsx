// This component is responsible for rendering each part of the page as a header or footer instead. This will be used by the _app.js file
import React from 'react'
// For the metadata
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

function Loyout({children}) {
  return (
    <div className='layout'>
      {/* Render the heade (metadata) */}
    <Head>
      <title>Merci4dev Ecomerce </title>
    </Head>

      {/* Render th header */}
    <header>
      <Navbar/>
    </header>

      {/* Render the body */}
    <main className='main-container'>
        {children}
    </main>

      {/* Render thea footer */}
    <footer>
      <Footer/>
    </footer>
  </div>
  )
}

export default Loyout