// Shared Wanilia nav/footer helpers
// Usage: include this file, then call waniliaNav() and waniliaFooter()

function waniliaNav(activePage) {
  const pages = [
    { href: 'index.html',   label: 'Strona główna' },
    { href: 'oferta.html',  label: 'Oferta' },
    { href: 'galeria.html', label: 'Galeria' },
    { href: 'nagrody.html', label: 'Nagrody' },
    { href: 'kontakt.html', label: 'Zamów 🎂' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');
  return `
  <nav class="nav" id="main-nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" style="gap:0;">
        <img src="images/logo-wanilia.png" alt="Wanilia i Migdały"
             style="height:46px;width:auto;object-fit:contain;
                    background:rgba(255,255,255,0.93);border-radius:10px;padding:5px 10px;">
      </a>
      <ul class="nav-links" id="nav-links">
        ${links}
        <li><a href="../index.html" style="border:1px solid rgba(212,160,23,0.4);border-radius:6px;">🐝 Pasieka</a></li>
      </ul>
      <button class="hamburger" id="hamburger" style="color:#fff;">☰</button>
    </div>
  </nav>`;
}

function waniliaFooter() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="images/logo-wanilia.png" alt="Wanilia i Migdały"
             style="height:56px;width:auto;background:#fff;border-radius:10px;padding:7px 14px;margin-bottom:14px;display:block;">
        <p>Ciasta, torty i wyroby garmażeryjne<br>z naturalnych składników własnego gospodarstwa.</p>
        <p style="margin-top:10px;font-size:0.78rem;color:rgba(255,255,255,0.45);">RHD WNI: 26113513</p>
      </div>
      <div class="footer-col">
        <h4>Strony</h4>
        <a href="index.html">Strona główna</a>
        <a href="oferta.html">Oferta</a>
        <a href="galeria.html">Galeria</a>
        <a href="nagrody.html">Nagrody</a>
        <a href="kontakt.html">Kontakt / Zamów</a>
      </div>
      <div class="footer-col">
        <h4>Oferta</h4>
        <a href="oferta.html">Sernik w kratkę</a>
        <a href="oferta.html">Torty okolicznościowe</a>
        <a href="oferta.html">Ciasta domowe</a>
        <a href="oferta.html">Wyroby garmażeryjne</a>
        <a href="oferta.html">Chlebki pszenne</a>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <p>📍 Małyszyn Dolny 20<br>27-220 Mirzec<br>Gmina Mirzec</p>
        <a href="tel:533863133">📞 533 863 133</a>
        <a href="mailto:dobrapszczola@o2.pl">✉ dobrapszczola@o2.pl</a>
        <a href="https://www.facebook.com/pasiekadobrapszczola" target="_blank" rel="noopener">📘 Facebook</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Wanilia i Migdały • Małgorzata i Rafał Zacharscy • Małyszyn Dolny</span>
      <div class="footer-certs">
        <span class="cert-badge" style="border-color:rgba(232,24,108,0.4);color:#f090c0;">🏆 Perła 2025</span>
        <span class="cert-badge" style="border-color:rgba(232,24,108,0.4);color:#f090c0;">🍽 Dziedzictwo Kulinarne</span>
        <a href="../index.html" style="text-decoration:none;"><span class="cert-badge" style="border-color:rgba(212,160,23,0.4);color:var(--gold-lt);">🐝 Pasieka Dobra Pszczoła</span></a>
      </div>
    </div>
  </footer>`;
}

function initWanilia() {
  document.getElementById('hamburger')?.addEventListener('click', () =>
    document.getElementById('nav-links')?.classList.toggle('open'));
  const obs = new IntersectionObserver(entries =>
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),
    {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
