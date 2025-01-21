let cart = [];

const addToCart = (productId) => {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += 1;
  } else {
    fetch('./data/products.json')
      .then(response => response.json())
      .then(products => {
        const item = products.find(p => p.id === productId);
        cart.push({ ...item, quantity: 1 });
        updateCartUI();
      });
  }
};

const updateCart = (productId, quantity) => {
  const product = cart.find(item => item.id === productId);
  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    product.quantity = quantity;
  }
  updateCartUI();
};

const clearCart = () => {
  cart = [];
  appliedPromo = null; // Reset promo code
  document.getElementById('promo-message').innerText = ''; // Clear promo message
  updateCartUI();
};

let appliedPromo = null; // Tracks applied promo code

const promoCodes = {
  ostad10: 0.10,
  ostad5: 0.05,
};

const applyPromoCode = () => {
  const promoInput = document.getElementById('promo-code').value.trim();
  const promoMessage = document.getElementById('promo-message');

  if (appliedPromo) {
    promoMessage.innerText = `Promo code "${appliedPromo}" already applied.`;
    return;
  }

  if (promoCodes[promoInput]) {
    appliedPromo = promoInput;
    promoMessage.innerText = `Promo code "${promoInput}" applied successfully!`;
    promoMessage.style.color = 'green';
    updateCartUI();
  } else {
    promoMessage.innerText = 'Invalid promo code.';
    promoMessage.style.color = 'red';
  }
};

document.getElementById('apply-promo').addEventListener('click', applyPromoCode);
