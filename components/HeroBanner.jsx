// Component that renders hero banner code
import React from 'react'
import Link from 'next/link'

// Call the url for the image
import {urlFor} from '../lib/client'

function HeroBanner({herroBaner}) {
  // Rendering header elements . the html tags content comming fron the backend
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo{'>{herroBaner.smallText}</p>
        <h3 className='gradient__text-inverse'>{herroBaner.midText}</h3>
        <h1 className='gradient__text'>{herroBaner.largeText1}</h1>
        <img 
          src={urlFor(herroBaner.image)} 
          alt='Headphone' 
          className='hero-banner-image'
          layout='responsive'
          />

        <div>
          <Link href={`/product/${herroBaner.product}`}>
              <button type='button'>{herroBaner.buttonText}</button>
          </Link>

          <div className='desc'>
              <h5>Description</h5>
              <p>{herroBaner.desc}</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default HeroBanner