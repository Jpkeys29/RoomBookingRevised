import {createClient} from '@sanity/client';

    const client = createClient({
    projectId: 'yydt0bri',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-05-03', 
    token: import.meta.env.VITE_SANITY_TOKEN, 
  })

  export default client;



