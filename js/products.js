const fetchProducts = async () => {
    const response = await fetch('./data/products.json');
    const products = await response.json();
    displayProducts(products);
  };
  
  const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `).join('');
  };
  
  fetchProducts();
  