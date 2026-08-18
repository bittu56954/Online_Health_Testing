import nodemailer from 'nodemailer';

let transporter = null;

export const initEmailTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('📧 Nodemailer initialized with SMTP credentials.');
  } else {
    console.log('ℹ️ Nodemailer: No live SMTP credentials specified in .env. OTPs will be displayed in server logs for testing.');
  }
};

export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: `"Smart Society Hub" <${process.env.EMAIL_FROM || 'noreply@smartsociety.com'}>`,
    to,
    subject,
    text: text || 'Please view this email in an HTML-compatible client.',
    html,
  };

  if (transporter) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✉️ Email successfully sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`⚠️ Failed to send live email to ${to}:`, error.message);
    }
  }

  // Safe fallback / Console display for developer ease
  console.log('====================================================');
  console.log(`📬 [SIMULATED EMAIL DISPATCH] TO: ${to}`);
  console.log(`📌 SUBJECT: ${subject}`);
  console.log(`📜 CONTENT PREVIEW: ${text || subject}`);
  console.log('====================================================');
  return { success: true, simulated: true };
};

export const sendOtpEmail = async (email, otp, purpose = 'Verification') => {
  const subject = `Your Smart Society OTP for ${purpose}: ${otp}`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">🏢 Smart Society Management</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Secure Account ${purpose}</p>
      </div>
      <div style="padding: 32px 24px; color: #334155; line-height: 1.6;">
        <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px;">Hello Resident / Member,</h2>
        <p style="margin: 0 0 24px 0; font-size: 15px;">Use the One-Time Password (OTP) below to complete your <strong>${purpose}</strong>. This code is valid for <strong>10 minutes</strong>.</p>
        <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #2563eb; font-family: monospace;">${otp}</span>
        </div>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b;">If you did not request this OTP, please ignore this email or reach out to society administration.</p>
      </div>
      <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
        &copy; ${new Date().getFullYear()} Smart Society Management System. All rights reserved.
      </div>
    </div>
  `;
  const text = `Your Smart Society ${purpose} OTP is: ${otp}. It expires in 10 minutes.`;
  return sendEmail({ to: email, subject, html, text });
};
