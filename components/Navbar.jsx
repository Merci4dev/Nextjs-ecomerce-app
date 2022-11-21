import React from 'react'
import Link from 'next/link'
// shoppin icons
import { AiOutlineShopping } from 'react-icons/ai'
import logo from '../public/versel.svg'
import Image from 'next/image'

// implementando la cart en el navbar
import {Cart} from './';
 import {useStateContext} from '../context/StateContext'

function Navbar() {
  // here we use the useStateContext for the global state
  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className='navbar-container'>
            <Link href={'/'}>
              <a>
              <Image 
                src={logo}
                alt='logo'
              />
            </a>
            
          </Link>
        {/* open and close the cart */}
        <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
            <AiOutlineShopping/>
            <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        {/* only show the cart when it is true */}
        {showCart && <Cart/>}
    </div>
  )
}

export default Navbar