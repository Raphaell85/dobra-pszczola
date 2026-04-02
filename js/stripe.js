// ─── STRIPE INTEGRATION ───────────────────────────────────────
// Replace YOUR_STRIPE_PUBLIC_KEY with your actual Stripe publishable key
// Get it from: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLIC_KEY = 'pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY';

let stripe, cardElement;

function initStripe() {
  if (typeof Stripe === 'undefined') return;
  stripe = Stripe(STRIPE_PUBLIC_KEY);
  const elements = stripe.elements({
    fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap' }]
  });
  cardElement = elements.create('card', {
    style: {
      base: {
        fontFamily: "'Lato', sans-serif",
        fontSize: '16px',
        color: '#3B1F0A',
        '::placeholder': { color: '#b0906a' },
      }
    }
  });
  const mountEl = document.getElementById('stripe-card-element');
  if (mountEl) cardElement.mount('#stripe-card-element');
}

async function submitPayment() {
  const name    = document.getElementById('checkout-name')?.value.trim();
  const email   = document.getElementById('checkout-email')?.value.trim();
  const address = document.getElementById('checkout-address')?.value.trim();
  const postal  = document.getElementById('checkout-postal')?.value.trim();
  const city    = document.getElementById('checkout-city')?.value.trim();
  const msgEl   = document.getElementById('payment-message');
  const successEl = document.getElementById('payment-success');
  const btn = document.getElementById('submit-payment');

  if (!name || !email || !address || !postal || !city) {
    msgEl.textContent = '⚠️ Wypełnij wszystkie wymagane pola.';
    return;
  }

  msgEl.textContent = '';
  btn.disabled = true;
  btn.textContent = '⏳ Przetwarzam...';

  try {
    // 1. Create PaymentIntent on server (Netlify Function)
    const cart = getCart();
    const shipping = getCartTotal() > 150 ? 0 : 15;
    const amount = Math.round((getCartTotal() + shipping) * 100); // grosze

    const intentRes = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'pln', items: cart, customerEmail: email })
    });

    if (!intentRes.ok) throw new Error('Błąd serwera płatności');
    const { clientSecret } = await intentRes.json();

    // 2. Confirm payment with Stripe.js
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name, email, address: { line1: address, postal_code: postal, city, country: 'PL' } }
      }
    });

    if (error) {
      msgEl.textContent = '❌ ' + error.message;
      btn.disabled = false;
      btn.textContent = '💳 Zapłać bezpiecznie';
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      successEl.style.display = 'block';
      btn.style.display = 'none';
      saveCart([]);
      updateCartUI();

      // Send confirmation email via Netlify Function
      await fetch('/.netlify/functions/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          items: cart,
          total: (getCartTotal() + shipping).toFixed(2),
          address: `${address}, ${postal} ${city}`,
          notes: document.getElementById('checkout-notes')?.value || '',
          paymentIntentId: paymentIntent.id
        })
      });
    }
  } catch (err) {
    msgEl.textContent = '❌ Wystąpił błąd: ' + err.message + '. Spróbuj ponownie lub zadzwoń: 609 239 345';
    btn.disabled = false;
    btn.textContent = '💳 Zapłać bezpiecznie';
  }
}

// Mount Stripe when checkout opens
document.addEventListener('click', e => {
  if (e.target.closest && e.target.textContent?.includes('Przejdź do kasy')) {
    setTimeout(initStripe, 100);
  }
});
