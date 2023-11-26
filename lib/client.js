import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'hus4bol2',
    dataset: 'production',
    apiVersion: '2023-11-20',
    useCdn: true,
    ignoreBrowserTokenWarning: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN

});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

