const API_URL =
  'https://tsodykteststore.myshopify.com/api/2023-01/graphql.json';

const query = `
       {
         products(first: 10) {
           edges {
             node {
               title
               description
               variants(first: 1) {
                 edges {
                   node {
                     price {
                       amount
                       currencyCode
                     }
                     compareAtPrice {
                       amount
                       currencyCode
                     }
                   }
                 }
               }
               images(first: 2) {
                 edges {
                   node {
                     url
                     altText
                   }
                 }
               }
             }
           }
         }
       }
     `;

export { API_URL, query };
