// functions/create-payment-intent.js
// Install: npm install stripe
// Set env var: STRIPE_SECRET_KEY in Netlify dashboard

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, currency, items, customerEmail } = JSON.parse(event.body);

    if (!amount || amount < 100) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid amount' }) };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || 'pln',
      receipt_email: customerEmail,
      metadata: {
        items: JSON.stringify(items?.map(i => `${i.name} x${i.qty}`) || []),
        source: 'Pasieka Dobra Pszczoła'
      },
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
    };
  } catch (err) {
    console.error('Stripe error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
