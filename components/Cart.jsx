import React,{useRef} from 'react'
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from "react-icons/ti"
import toast from 'react-hot-toast'

import {urlFor} from '../lib/client'
import {useStateContext} from '../context/StateContext'
import getStripe from '../lib/getStripe'

function Cart() {
  
  const cartRef = useRef();
  // global data access
  const {showCart, totalPrice, cartItems, setShowCart, totalQuantities, toggleCartItemQuantity,onRemove} = useStateContext();


  // handle the logic of the pay button with strip 
  const handleCheckout = async () => {
    const stripe = await getStripe();
    
    // This makes an api request to our own nexjs backend. we use frect but you can with axios too
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>

      {/* botton to open cart */}
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          {/*  Indicate the item number we fear */}
          <span className='cart-num-items'>({totalQuantities} Items )</span>
        </button>

      {/* render the bag car when it is empty */}
        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
                <AiOutlineShopping size={200}/>
                <h3>Your Shopping bag is empty</h3>
                <Link href='/'>
                  {/* render the boton */}
                  <button type='button' onClick={() => setShowCart(false)} className='btn'>
                      Continue Shopping
                  </button>
                </Link>
            </div>
          )
        }

        {/* If there are products in car it renders it */}
        <div className='product-container'>
          {
            cartItems.length >= 1 && cartItems.map((item) =>(
              <div className='product' key={item._id}>
                <img src={urlFor(item?.image[0])} className='cart-product-image'/>
                <div className='item-desc'>
                    <div className='flex top'>
                    <h5 >{item.name}</h5>
                    <h4 >{item.price}</h4>
                    </div>

                    {/*buttons on cart that increment or decrement */}
                    <div className='flex bottom'>
                        <div>
                            <p className='quantity-desc'>
                              <span 
                                className='minus' 
                                onClick={() => toggleCartItemQuantity(item._id, 'dec')}> <AiOutlineMinus/>
                              </span>

                              <span 
                                  className='num'>
                                  {item.quantity}
                              </span>

                              <span 
                                className='plus' 
                                onClick={() => toggleCartItemQuantity(item._id, 'inc')}>      <AiOutlinePlus/>
                                </span>
                            </p>
                        </div>

                        {/* button to remove from cart */}
                        <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                            <TiDeleteOutline size={30}/>
                        </button>
                    </div>

                </div>
              </div>
            ))
          }
        </div>

          {/* render the subtotal amount */}
        {
          cartItems.length >= 1 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Sub-Total</h3>
                <h3>${totalPrice}</h3>
              </div>

              {/* Render paymenet mothod */}
              <div className='bnt-container'>
                <button type='button' className='btn' onClick={handleCheckout}>
                  Pay with Stype
                </button>
              </div>
            </div>
          )
        }
         
      </div>
    </div>
  )
}

export default Cart 