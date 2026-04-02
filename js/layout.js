// ─── SHARED LAYOUT ─────────────────────────────────────────────────────────
// logoPath – relative to the calling page (root pages use 'images/...',
//            wanilia sub-pages use '../images/...')

function getNavHTML(logoPath, waniliaLogoPath) {
  const isWanilia = window.location.pathname.includes('/wanilia/');
  return `
  <nav class="nav" id="main-nav">
    <div class="nav-inner">

      <a href="${isWanilia ? '../index.html' : 'index.html'}" class="nav-logo">
        <img src="${logoPath}" alt="Pasieka Dobra Pszczoła – logo"
             style="height:52px;width:auto;object-fit:contain;">
      </a>

      <ul class="nav-links" id="nav-links">
        <li><a href="${isWanilia ? '../index.html' : 'index.html'}">Strona główna</a></li>
        <li><a href="${isWanilia ? '../o-nas.html' : 'o-nas.html'}">O pasiece</a></li>
        <li><a href="${isWanilia ? '../nagrody.html' : 'nagrody.html'}">Nagrody</a></li>
        <li><a href="${isWanilia ? '../sklep.html' : 'sklep.html'}">Sklep 🍯</a></li>
        <li><a href="${isWanilia ? '../galeria.html' : 'galeria.html'}">Galeria</a></li>
        <li><a href="${isWanilia ? 'index.html' : 'wanilia/index.html'}"
               style="border:1px solid rgba(212,160,23,0.45);border-radius:6px;padding:6px 12px !important;">
          ${isWanilia ? '🐝 Pasieka' : '🎂 Wanilia i Migdały'}
        </a></li>
        <li><a href="${isWanilia ? 'kontakt.html' : 'kontakt.html'}">Kontakt</a></li>
      </ul>

      <div style="display:flex;align-items:center;gap:10px;">
        <button class="nav-cart" id="nav-cart-btn" aria-label="Koszyk" title="Twój koszyk">
          🛒
          <span class="cart-badge" id="cart-badge-nav">0</span>
        </button>
        <button class="hamburger" id="hamburger" aria-label="Menu">☰</button>
      </div>

    </div>
  </nav>

  <!-- Cart Drawer -->
  <div class="cart-overlay" id="cart-overlay"></div>
  <div class="cart-drawer" id="cart-drawer">
    <div class="cart-header">
      <h2>🛒 Twój koszyk</h2>
      <button class="cart-close" id="cart-close-btn" aria-label="Zamknij koszyk">×</button>
    </div>
    <div class="cart-items" id="cart-items-list"></div>
    <div class="cart-footer">
      <div class="cart-total-row">
        <strong>Do zapłaty:</strong>
        <span class="total-price" id="cart-total-price">0,00 zł</span>
      </div>
      <p style="font-size:0.78rem;color:#9a7a5a;text-align:center;margin-bottom:12px;">
        🚚 Darmowa dostawa od 150 zł
      </p>
      <button class="btn-checkout" onclick="openCheckout()">Przejdź do kasy →</button>
    </div>
  </div>
  `;
}

function getFooterHTML(logoPath) {
  const isWanilia = window.location.pathname.includes('/wanilia/');
  const base = isWanilia ? '../' : '';
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="${logoPath}" alt="Pasieka Dobra Pszczoła"
             style="height:80px;width:auto;object-fit:contain;margin-bottom:16px;
                    background:rgba(255,255,255,0.08);border-radius:12px;padding:8px;">
        <p>Rodzinna pasieka Małgorzaty i Rafała Zacharskich.<br>
           Naturalny miód z serca Puszczy Iłżeckiej.</p>
        <div class="footer-social" style="margin-top:20px;">
          <a href="https://www.facebook.com/pasiekadobrapszczola" target="_blank" rel="noopener" title="Facebook" style="font-style:normal;font-weight:900;font-size:1rem;">f</a>
          <a href="tel:609239345" title="Zadzwoń">📞</a>
          <a href="mailto:dobrapszczola@o2.pl" title="Email">✉</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Pasieka</h4>
        <a href="${base}index.html">Strona główna</a>
        <a href="${base}o-nas.html">O pasiece</a>
        <a href="${base}nagrody.html">Nagrody</a>
        <a href="${base}sklep.html">Sklep</a>
        <a href="${base}galeria.html">Galeria</a>
        <a href="${base}kontakt.html">Kontakt</a>
      </div>
      <div class="footer-col">
        <h4>Nasze miody</h4>
        <a href="${base}sklep.html">Miód wielokwiatowy wiosenny</a>
        <a href="${base}sklep.html">Miód spadziowy iglasty</a>
        <a href="${base}sklep.html">Miód gryczany</a>
        <a href="${base}sklep.html">Miód lipowy</a>
        <a href="${base}sklep.html">Pyłek pszczeli</a>
        <a href="${base}sklep.html">Pierzga pszczela</a>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <p>📍 Małyszyn Dolny 20<br>gmina Mirzec<br>woj. świętokrzyskie</p>
        <a href="tel:609239345">📞 609 239 345</a>
        <a href="mailto:dobrapszczola@o2.pl">✉ dobrapszczola@o2.pl</a>
        <a href="${base}wanilia/index.html" style="margin-top:12px;color:#f0c0e0 !important;">🎂 Wanilia i Migdały</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Pasieka Dobra Pszczoła • Małyszyn Dolny • Miody z sercem ze Świętokrzyskiego</span>
      <div class="footer-certs">
        <span class="cert-badge">🏆 Perła 2023</span>
        <span class="cert-badge">🍽 Dziedzictwo Kulinarne Świętokrzyskie</span>
        <span class="cert-badge">🌿 Natura 2000</span>
      </div>
    </div>
  </footer>
  `;
}

function getCheckoutModalHTML() {
  return `
  <div class="checkout-overlay" id="checkout-overlay">
    <div class="checkout-modal">
      <h2>Zamówienie 🍯</h2>
      <p class="subtitle">Bezpieczna płatność kartą / BLIK przez Stripe</p>

      <div class="order-summary">
        <h4>Twoje zamówienie:</h4>
        <div id="order-summary-lines"></div>
        <div id="order-total-checkout"></div>
      </div>

      <p class="shipping-note">🚚 Wysyłka kurierem InPost | Czas realizacji 2–3 dni robocze</p>

      <div class="form-group">
        <label>Imię i nazwisko *</label>
        <input type="text" id="checkout-name" placeholder="Jan Kowalski" required>
      </div>
      <div class="form-group">
        <label>E-mail *</label>
        <input type="email" id="checkout-email" placeholder="jan@przykład.pl" required>
      </div>
      <div class="form-group">
        <label>Telefon</label>
        <input type="tel" id="checkout-phone" placeholder="600 000 000">
      </div>
      <div class="form-group">
        <label>Adres dostawy *</label>
        <input type="text" id="checkout-address" placeholder="ul. Kwiatowa 1" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Kod pocztowy *</label>
          <input type="text" id="checkout-postal" placeholder="00-000" required>
        </div>
        <div class="form-group">
          <label>Miasto *</label>
          <input type="text" id="checkout-city" placeholder="Warszawa" required>
        </div>
      </div>
      <div class="form-group">
        <label>Uwagi do zamówienia</label>
        <textarea id="checkout-notes" rows="2" placeholder="np. proszę dzwonić przed dostawą"></textarea>
      </div>
      <div class="form-group">
        <label>Dane karty płatniczej *</label>
        <div id="stripe-card-element"></div>
      </div>

      <div id="payment-message"></div>
      <div id="payment-success">
        ✅ Zamówienie przyjęte! Dziękujemy. Potwierdzenie wysłaliśmy na e-mail.
      </div>

      <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
        <button class="btn-checkout" id="submit-payment" onclick="submitPayment()">
          💳 Zapłać bezpiecznie
        </button>
        <button onclick="closeCheckout()"
                style="background:#f0e8d8;border:none;border-radius:50px;padding:16px 24px;
                       cursor:pointer;font-weight:700;color:var(--brown);">
          Anuluj
        </button>
      </div>
      <p style="font-size:0.75rem;color:#b0906a;margin-top:12px;text-align:center;">
        🔒 Płatność szyfrowana SSL • Stripe • PCI DSS
      </p>
    </div>
  </div>
  `;
}
