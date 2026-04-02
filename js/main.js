// ─── CART STATE ───────────────────────────────────────────────
const CART_KEY = 'dobraPszczola_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartUI();
  openCart();
  showToast(`🍯 Dodano do koszyka!`);
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCartItems();
  updateCartUI();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart(cart);
  renderCartItems();
  updateCartUI();
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// ─── CART UI ──────────────────────────────────────────────────
function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCartItems() {
  const cart = getCart();
  const container = document.getElementById('cart-items-list');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 24px; color:#9a7a5a;">
        <div style="font-size:3rem; margin-bottom:12px;">🛒</div>
        <p>Twój koszyk jest pusty.</p>
        <a href="sklep.html" style="color:var(--gold); font-weight:700; text-decoration:none;">Przejdź do sklepu →</a>
      </div>`;
    document.getElementById('cart-total-price').textContent = '0,00 zł';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji || '🍯'}</div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${item.weight}</span>
      </div>
      <div class="cart-item-qty">
        <button onclick="changeQty('${item.id}', -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.id}', 1)">+</button>
      </div>
      <div class="cart-item-price">${(item.price * item.qty).toFixed(2).replace('.', ',')} zł</div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Usuń">×</button>
    </div>
  `).join('');

  const total = getCartTotal();
  document.getElementById('cart-total-price').textContent = total.toFixed(2).replace('.', ',') + ' zł';
}

function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  renderCartItems();
}

function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
}

// ─── TOAST ────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:var(--brown);color:#fff;padding:14px 28px;border-radius:50px;
      font-weight:700;font-size:0.95rem;z-index:2000;box-shadow:0 8px 24px rgba(0,0,0,0.3);
      transition:opacity 0.3s;`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.opacity = '0', 2800);
}

// ─── NAV ──────────────────────────────────────────────────────
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Set active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Cart btn
  document.getElementById('nav-cart-btn')?.addEventListener('click', openCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
}

// ─── SCROLL REVEAL ────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── CHECKOUT ─────────────────────────────────────────────────
function openCheckout() {
  closeCart();
  const cart = getCart();
  if (cart.length === 0) { showToast('Koszyk jest pusty!'); return; }

  const summary = document.getElementById('order-summary-lines');
  const total   = document.getElementById('order-total-checkout');
  if (summary) {
    summary.innerHTML = cart.map(i =>
      `<div class="order-line"><span>${i.name} × ${i.qty}</span><span>${(i.price * i.qty).toFixed(2).replace('.', ',')} zł</span></div>`
    ).join('');
  }
  const shipping = 15;
  const grand    = getCartTotal() + (getCartTotal() > 150 ? 0 : shipping);
  if (total) {
    total.innerHTML = `
      <div class="order-line"><span>Produkty</span><span>${getCartTotal().toFixed(2).replace('.', ',')} zł</span></div>
      <div class="order-line"><span>Wysyłka</span><span>${getCartTotal() > 150 ? '<span style="color:var(--green)">GRATIS</span>' : shipping + ' zł'}</span></div>
      <div class="order-line total"><span>RAZEM</span><span>${grand.toFixed(2).replace('.', ',')} zł</span></div>`;
  }

  document.getElementById('checkout-overlay')?.classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkout-overlay')?.classList.remove('open');
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  updateCartUI();
});
