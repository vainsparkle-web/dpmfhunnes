// api/register.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email wajib diisi' });
  }

  try {
    // Konfigurasi pengiriman email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Kirim email ke admin
    await transporter.sendMail({
      from: `"Open Member" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Pendaftaran Baru',
      text: `Email pendaftar: ${email}`
    });

    return res.status(200).json({ message: 'Pendaftaran berhasil!' });
  } catch (error) {
    console.error('Gagal kirim email:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengirim email' });
  }
}
