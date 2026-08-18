import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim() : '';

  // Modern HTML Email Template builder
  const formattedHtml = options.html || `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #0d9488 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 32px 28px; }
        .otp-box { background: #f0fdf4; border: 2px dashed #16a34a; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0; }
        .otp-code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #15803d; margin: 0; font-family: monospace; }
        .info-text { font-size: 15px; line-height: 1.6; color: #334155; }
        .footer { background: #f8fafc; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Smart Medical Care Platform</h1>
          <p>Security & Email Verification</p>
        </div>
        <div class="content">
          <p class="info-text">Hello,</p>
          <p class="info-text">${options.message || 'Use the verification code below to verify your account or complete your request:'}</p>
          ${options.otp ? `
          <div class="otp-box">
            <div class="otp-code">${options.otp}</div>
            <p style="margin: 8px 0 0; font-size: 12px; color: #166534;">Valid for 10 minutes. Do not share this code with anyone.</p>
          </div>
          ` : ''}
          <p class="info-text" style="font-size: 13px; color: #64748b; margin-top: 24px;">
            If you did not initiate this request, you can safely ignore this email.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Smart Medical Care Health & Security System. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  // Fallback simulator if credentials are not configured in environment
  if (!user || !pass) {
    console.log(`\n========================================================`);
    console.log(` [MEDISCAN EMAIL SIMULATOR / NO SMTP CONFIG]`);
    console.log(` To: ${options.email}`);
    console.log(` Subject: ${options.subject}`);
    if (options.otp) console.log(` OTP Code: >>> ${options.otp} <<<`);
    console.log(` Message: ${options.message}`);
    console.log(`========================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465,
      auth: { user: user, pass: pass },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000,
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"MEDISCAN Security" <${user}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: formattedHtml
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[MEDISCAN EMAIL SUCCESS] Direct email delivered to ${options.email}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[MEDISCAN EMAIL ERROR] Could not deliver email to ${options.email}: ${error.message}`);
    console.log(`[EMAIL FALLBACK DEV LOG] OTP for ${options.email}: ${options.otp || 'N/A'}`);
    return { success: false, error: error.message };
  }
};
