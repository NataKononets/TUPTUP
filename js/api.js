const API_URL = 'https://dummyjson.com/products';
const productGrid = document.getElementById('productGrid');

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    renderProducts(data.products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function renderProducts(products) {
  productGrid.innerHTML = '';

  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';

    col.innerHTML = `
      <div class="product-card h-100">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h5>${product.title}</h5>
        <p>$${product.price}</p>

        <button 
          class="btn tup-btn w-100 add-to-cart"
          data-id="${product.id}"
          data-name="${product.title}"
          data-price="${product.price}"
          data-img="${product.thumbnail}">
          Add to Cart
        </button>
      </div>
    `;

    productGrid.appendChild(col);
  });
}

fetchProducts();