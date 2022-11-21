// isert the instagra en twitter icons
import React from 'react'
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

function Footer() {
  return (
    <div className='footer-container'>
      <p>2022 Merci Headphones All right reserve</p>
      <p>
        <AiFillInstagram size={40}/>
        <AiOutlineTwitter size={40}/>
      </p>
    </div>
  )
}

export default Footer