'use strict';
import { API_URL, query } from './apiConfig.js';

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          '7e174585a317d187255660745da44cc7',
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok)
      throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.data.products.edges;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const renderProducts = async () => {
  const products = await fetchData();
  const productsContainer =
    document.querySelector('.products');

  const productContainer = document.createElement('div');
  productContainer.className =
    'container product-container';

  products.forEach(({ node }) => {
    const images = node.images.edges;
    const firstImgUrl =
      images[0]?.node.url ||
      'https://picsum.photos/300/300';
    const secondImgUrl =
      images[1]?.node.url ||
      'https://picsum.photos/300/300';

    const productsArticle =
      document.createElement('article');
    productsArticle.className = 'product';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const imgFront = document.createElement('img');
    imgFront.src = firstImgUrl;
    imgFront.alt = node.title || 'product';
    imgFront.className = 'img-front';

    const imgBack = document.createElement('img');
    imgBack.src = secondImgUrl;
    imgBack.alt = node.title || 'product';
    imgBack.className = 'img-back';

    imgContainer.append(imgFront, imgBack);

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';

    const title = document.createElement('h2');
    title.className = 'product-title';
    title.textContent = node.title;

    const description = document.createElement('p');
    description.textContent =
      node.description || 'No description';
    description.className = 'product-description';

    const prices = document.createElement('div');
    prices.className = 'prices';

    const compareAtPrice = document.createElement('p');
    compareAtPrice.className = 'compare-at-price';
    const compareAtPriceNode =
      node.variants.edges[0].node.compareAtPrice;
    compareAtPrice.textContent = compareAtPriceNode
      ? compareAtPriceNode.amount
      : '';

    const price = document.createElement('p');

    price.textContent =
      node.variants.edges[0].node.price.amount;
    price.className = 'price';

    prices.append(compareAtPrice, price);

    productInfo.append(title, description, prices);

    productsArticle.append(imgContainer);
    productsArticle.append(productInfo);

    productContainer.append(productsArticle);
  });

  productsContainer.append(productContainer);
};

renderProducts();

document
  .querySelectorAll('.accordion-toggle')
  .forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const item = toggle.parentElement;
      item.classList.toggle('active');
    });
  });
