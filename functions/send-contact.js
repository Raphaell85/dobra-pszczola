// functions/send-contact.js
// Direct form handler — works on Netlify with env vars
// Set in Netlify Dashboard > Site settings > Environment variables:
//   EMAIL_USER  = your Gmail address (e.g. twojmail@gmail.com)
//   EMAIL_PASS  = Gmail App Password (16-char, from myaccount.google.com/apppasswords)
//   OWNER_EMAIL = dobrapszczola@o2.pl

const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, phone, subject, message, brand } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Brakuje wymaganych pól' }) };
    }

    const brandName = brand === 'wanilia' ? 'Wanilia i Migdały' : 'Pasieka Dobra Pszczoła';
    const ownerEmail = process.env.OWNER_EMAIL || 'dobrapszczola@o2.pl';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ── E-mail do właściciela ────────────────────────────────
    await transporter.sendMail({
      from: `"Formularz – ${brandName}" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      replyTo: email,
      subject: `📩 ${brandName}: ${subject || 'Nowa wiadomość'} – od ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;">
          <div style="background:#3B1F0A;padding:22px 28px;border-radius:12px 12px 0 0;">
            <h2 style="color:#F5C842;margin:0;font-size:1.3rem;">${brandName}</h2>
            <p style="color:rgba(255,255,255,0.65);margin:4px 0 0;font-size:0.85rem;">Nowa wiadomość z formularza kontaktowego</p>
          </div>
          <div style="background:#fdf8ee;padding:24px 28px;border:1px solid #e8d8c0;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 0;font-weight:bold;width:120px;color:#5a3d1e;">Imię:</td><td style="padding:6px 0;">${name}</td></tr>
              <tr><td style="padding:6px 0;font-weight:bold;color:#5a3d1e;">E-mail:</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#D4A017;">${email}</a></td></tr>
              <tr><td style="padding:6px 0;font-weight:bold;color:#5a3d1e;">Telefon:</td><td style="padding:6px 0;">${phone || '–'}</td></tr>
              <tr><td style="padding:6px 0;font-weight:bold;color:#5a3d1e;">Temat:</td><td style="padding:6px 0;">${subject || '–'}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;border-left:4px solid #D4A017;">
              <strong style="color:#3B1F0A;">Wiadomość:</strong>
              <p style="margin-top:8px;white-space:pre-wrap;color:#5a3d1e;">${message}</p>
            </div>
            <p style="margin-top:16px;font-size:0.8rem;color:#9a7a5a;">
              Możesz odpowiedzieć bezpośrednio na tę wiadomość (reply-to: ${email})
            </p>
          </div>
        </div>
      `,
    });

    // ── Auto-odpowiedź do nadawcy ────────────────────────────
    await transporter.sendMail({
      from: `"${brandName}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Otrzymaliśmy Twoją wiadomość – ${brandName}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;">
          <div style="background:#3B1F0A;padding:22px 28px;border-radius:12px 12px 0 0;">
            <h2 style="color:#F5C842;margin:0;">${brandName}</h2>
          </div>
          <div style="background:#fdf8ee;padding:24px 28px;border:1px solid #e8d8c0;border-radius:0 0 12px 12px;">
            <p>Drogi/a <strong>${name}</strong>,</p>
            <p>Dziękujemy za kontakt! Odpiszemy najszybciej jak to możliwe – zwykle w ciągu 24 godzin.</p>
            <div style="background:#fff;border-radius:8px;padding:16px;margin:16px 0;border:1px solid #e8d8c0;">
              <strong style="color:#3B1F0A;">Twoja wiadomość:</strong>
              <p style="color:#7a5c35;margin-top:8px;font-style:italic;">"${message.substring(0,200)}${message.length>200?'...':''}"</p>
            </div>
            <p>W pilnych sprawach prosimy o kontakt telefoniczny:</p>
            <ul style="color:#5a3d1e;">
              <li>📞 Pasieka Dobra Pszczoła: <a href="tel:609239345" style="color:#D4A017;">609 239 345</a></li>
              <li>📞 Wanilia i Migdały: <a href="tel:533863133" style="color:#D4A017;">533 863 133</a></li>
            </ul>
            <p style="margin-top:20px;">Pozdrawiamy serdecznie,<br>
            <strong>Małgorzata i Rafał Zacharscy</strong><br>
            <span style="color:#9a7a5a;font-size:0.85rem;">Pasieka Dobra Pszczoła • Wanilia i Migdały<br>
            Małyszyn Dolny 20, 27-220 Mirzec</span></p>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    console.error('send-contact error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
