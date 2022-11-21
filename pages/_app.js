
import React from 'react'
// for notifications
import {Toaster} from 'react-hot-toast'
import '../styles/globals.css'
import {Loyout} from '../components'

import {StateContext} from '../context/StateContext'

function MyApp({ Component, pageProps }) {
  return(
    // Evover el layout dentro de StateContext permite pasar los dato de StateContext a cada componente dentro de este
    <StateContext>
    <Loyout>
        <Toaster/>
        {/* reder the body*/}
        <Component {...pageProps} />
      </Loyout>
    </StateContext>
  ) 
  
}

export default MyApp
