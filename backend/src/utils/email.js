import nodemailer from "nodemailer";

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password for Gmail
    },
  });
};

export const sendOtpEmail = async (toEmail, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Recipe App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🔑 Your OTP Code for Login",
    text: `Your OTP is ${otp}. It will expire in 10 minutes. Do not share this code with anyone.`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">Recipe App</h1>
          </div>

          <!-- Body -->
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #111827; margin-bottom: 15px;">Your One-Time Password</h2>
            <p style="font-size: 15px; color: #4b5563; margin-bottom: 20px;">
              Use the code below to complete your login. It will expire in <b>10 minutes</b>.
            </p>
            
            <div style="margin: 25px 0;">
              <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #2563eb; display: inline-block; background: #f9fafb; padding: 16px 28px; border-radius: 8px; border: 1px solid #d1d5db;">
                ${otp}
              </span>
            </div>

            <p style="font-size: 14px; color: #ef4444; font-weight: bold;">
              ⚠️ Do not share this code with anyone.
            </p>

            <p style="font-size: 13px; color: #6b7280; margin-top: 20px;">
              If you did not request this login, you can safely ignore this email.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
            &copy; ${new Date().getFullYear()} Recipe App. All rights reserved.
          </div>

        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
