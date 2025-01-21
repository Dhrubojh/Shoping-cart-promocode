
const updateCartUI = () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotalElement = document.getElementById('cart-subtotal');
  const cartDiscountElement = document.getElementById('cart-discount');
  const cartTotalElement = document.getElementById('cart-total');
  const cartCountElement = document.getElementById('cart-count');

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h4>${item.name}</h4>
      <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
      <input type="number" min="1" value="${item.quantity}" onchange="updateCart(${item.id}, this.value)">
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (appliedPromo && promoCodes[appliedPromo]) {
    discount = subtotal * promoCodes[appliedPromo];
  }

  const finalTotal = subtotal - discount;

  cartSubtotalElement.innerText = subtotal.toFixed(2);
  cartDiscountElement.innerText = discount.toFixed(2);
  cartTotalElement.innerText = finalTotal.toFixed(2);

  cartCountElement.innerText = `Cart: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`;
};
