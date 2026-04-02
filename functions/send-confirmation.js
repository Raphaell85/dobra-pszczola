// functions/send-confirmation.js
// Uses Nodemailer with Gmail SMTP (or any SMTP)
// Set env vars: EMAIL_USER, EMAIL_PASS, OWNER_EMAIL

const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  try {
    const { customerName, customerEmail, items, total, address, notes, paymentIntentId } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const itemsList = items.map(i => `  • ${i.name} × ${i.qty} = ${(i.price * i.qty).toFixed(2)} zł`).join('\n');

    // Email to customer
    await transporter.sendMail({
      from: `"Pasieka Dobra Pszczoła" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: '🍯 Potwierdzenie zamówienia – Pasieka Dobra Pszczoła',
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#fdf8ee;border-radius:16px;overflow:hidden;">
          <div style="background:#3B1F0A;padding:32px;text-align:center;">
            <h1 style="color:#F5C842;margin:0;font-size:1.8rem;">Pasieka Dobra Pszczoła 🐝</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;">Dziękujemy za zamówienie!</p>
          </div>
          <div style="padding:32px;">
            <p>Drogi/a <strong>${customerName}</strong>,</p>
            <p>Twoje zamówienie zostało przyjęte i opłacone. Wyślemy je w ciągu 2–3 dni roboczych.</p>
            <div style="background:#fff;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #e8d8c0;">
              <h3 style="color:#3B1F0A;margin-top:0;">Zamówione produkty:</h3>
              ${items.map(i => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0e8d8;">
                <span>${i.name} × ${i.qty}</span>
                <strong>${(i.price * i.qty).toFixed(2)} zł</strong>
              </div>`).join('')}
              <div style="display:flex;justify-content:space-between;padding:12px 0 0;font-size:1.1rem;">
                <strong>RAZEM:</strong><strong style="color:#D4A017;">${total} zł</strong>
              </div>
            </div>
            <p>📍 <strong>Adres dostawy:</strong> ${address}</p>
            ${notes ? `<p>📝 <strong>Uwagi:</strong> ${notes}</p>` : ''}
            <p style="margin-top:24px;">W razie pytań zadzwoń: <a href="tel:609239345" style="color:#D4A017;">609 239 345</a></p>
            <p>Pozdrawiamy serdecznie,<br><strong>Małgorzata i Rafał Zacharscy</strong><br>Pasieka Dobra Pszczoła</p>
          </div>
        </div>
      `
    });

    // Notification to owner
    await transporter.sendMail({
      from: `"Sklep Pasieka" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL || 'dobrapszczola@o2.pl',
      subject: `🛒 Nowe zamówienie od ${customerName} – ${total} zł`,
      text: `Nowe zamówienie!\n\nKlient: ${customerName} (${customerEmail})\nTel: ${notes}\nAdres: ${address}\n\nProdukty:\n${itemsList}\n\nRazem: ${total} zł\nPayment ID: ${paymentIntentId}`
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Email error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
