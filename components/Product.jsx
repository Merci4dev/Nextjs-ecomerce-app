import React from 'react'
import Link from 'next/link'
// Call the url for the image
import {urlFor} from '../lib/client'

// Component responsible for rendering the products
function Product({product: {image, name, slug, price}}) {
  return (
    <div>
      {/* This url points to the specific product */}
    <Link href={`/product/${slug.current}`}>
      <div className='product-card'>
        <img 
          src={urlFor(image && image[0])}
          width={250}
          height={250}
          className='product-image'
        />
        <p className='product-name'>{name}</p>
        <p className='product-price'>${price}</p>
      </div>
    </Link>
  </div>
  )
}

export default Product