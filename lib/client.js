// This file creates the client server connection interface. sanity and next

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// The obj values ​​come from the control panel in sanity manager
export const client = sanityClient({
    projectId:'n40ldlc7',
    dataset:'production',
    apiVersion:'2022-10-06',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKE
})

// to use the sanity images
const builder = imageUrlBuilder(client);

// para hacer al las imagenes donde estan guardadas las imanes
export const urlFor = (source) => builder.image(source);

  