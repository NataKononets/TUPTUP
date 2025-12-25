let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = totalQty;
}


document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;

  const product = {
    id: btn.dataset.id,
    name: btn.dataset.name,
    price: Number(btn.dataset.price),
    img: btn.dataset.img,
    qty: 1
  };

  addToCart(product);
});


function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }

  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
  }
}

function renderCart() {
  const cartBox = document.getElementById('cartItems');
  const totalBox = document.getElementById('cartTotal');

  if (!cartBox) return;

  cartBox.innerHTML = '';

  if (cart.length === 0) {
    cartBox.innerHTML = `<p class="text-center">Cart is empty</p>`;
    if (totalBox) totalBox.textContent = '$0.00';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    cartBox.innerHTML += `<div class="cart-item d-flex align-items-center gap-3 mb-3">
        <img src="${item.img}" width="80" alt="">
        <div class="flex-grow-1">
          <h6>${item.name}</h6>
          <p>$${item.price}</p>
          <div class="d-flex align-items-center gap-2">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')">
          ✕
        </button>
      </div>
    `;
  });

  if (totalBox) {
    totalBox.textContent = `$${total.toFixed(2)}`;
  }
}
  

updateCartCount();
renderCart();