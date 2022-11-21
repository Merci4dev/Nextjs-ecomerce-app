// Main component of the app. This is responsible for rendering the component as header body and footer

import React from 'react'

// impor the conextion interfaz to the backeend
import {client} from '../lib/client'
import {Product, FooterBaner, HeroBaner} from '../components'

function Home({products, bannerData}) {
  return (
    <>
      {/* Hero section. With a conditional we pass through props to the component the first object of the arrya that we get from the backend */}
      <HeroBaner herroBaner={bannerData.length && bannerData[0]}/>
  
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p> Best Headphones tranding Market</p>
      </div>

      {/*Products section. loop through the products coming from the backend*/}
      <div className='products-container'>
        {
          products?.map((product) => <Product key={product._id} product={product}/>)   
        }
      </div>


       {/* Footer section */}
      <div>
        <FooterBaner
        footerBanner={bannerData && bannerData[0]}
      /> 
    </div>
    
    </>
  )
}


// we use getServerSideProps to fetch the data. works like react's useEffect. 
export async function getServerSideProps() {
  // sigifica, quiero tomar todos los productos de sanity dashboard
  const query = '*[_type == "product"]';

  // we pass the query to the client
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  // return an object with these values
  return {
    props: {products, bannerData}
  }
}


export default Home