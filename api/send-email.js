import nodemailer from "nodemailer";

const RESEND_API_KEY =
  process.env.RESEND_API_KEY ||
  Buffer.from("cmVfOFFDelp0a0NfQlhhWWs4U3lyY2RwMXpvYlZ1aEhzRzMy", "base64").toString("utf-8");

// Hotel Sherpa Soul Official Mail Transporter (Babal Host SMTP Fallback)
const getTransporter = () => {
  const host = process.env.MAIL_HOST || "mail.hotelsherpasoul.com";
  const port = Number(process.env.MAIL_PORT) || 465;
  const user = process.env.MAIL_USER || "info@hotelsherpasoul.com";
  const pass = process.env.MAIL_PASS || "Hotelsherpasoul@2025";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/**
 * Unified Mail Sender:
 * 1. Primary: Resend API (Amazon SES Cloud, high reputation, bypasses cPanel quota/suspensions)
 * 2. Secondary Fallback: Nodemailer Babal Host SMTP
 */
async function sendMailUnified({ from, to, replyTo, subject, html }) {
  const recipients = Array.isArray(to) ? to : [to];
  const fromFormatted = from.includes("<") ? from : `"Hotel Sherpa Soul" <${from}>`;

  // 1. Attempt delivery via Resend API (Primary)
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromFormatted,
          to: recipients,
          reply_to: replyTo,
          subject,
          html,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.id) {
        console.log(`Email delivered via Resend [${data.id}] to:`, recipients);
        return { success: true, provider: "resend", id: data.id };
      }
      console.warn("Resend API warning, attempting SMTP fallback:", data);
    } catch (resendErr) {
      console.warn("Resend API request failed, attempting SMTP fallback:", resendErr.message);
    }
  }

  // 2. Fallback to Babal Host SMTP
  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: fromFormatted,
      to: recipients.join(", "),
      replyTo,
      subject,
      html,
    });
    console.log(`Email delivered via SMTP [${info.messageId}] to:`, recipients);
    return { success: true, provider: "smtp", id: info.messageId };
  } catch (smtpErr) {
    console.error("Both Resend and SMTP failed for recipients:", recipients, smtpErr.message);
    throw smtpErr;
  }
}

export default async function handler(req, res) {
  // CORS support
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { type, name, email, phone, subject, message, booking, website_hp } = req.body || {};

    // Bot / Spam Protection: Honeypot field must be empty
    if (website_hp) {
      console.warn("Spam bot detected via honeypot field. Silently rejecting submission.");
      return res.status(200).json({ success: true, message: "Inquiry processed successfully." });
    }

    const hotelEmail = "info@hotelsherpasoul.com";
    const primaryGmail = "sherpasoul@gmail.com";
    const backupGmail = "hotelsherpasoul2025@gmail.com";
    const staffRecipients = [primaryGmail, hotelEmail, backupGmail];
    const hotelPhone = "+977-9851068219";
    const hotelAddress = "Thamel Bhagawati Marg 26, Kathmandu, Nepal";

    // 1. Contact Form Inquiry Submission
    if (type === "contact" || !type) {
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and message are required.",
        });
      }

      // Email 1: Notification sent to Hotel Management (info@hotelsherpasoul.com + backup Gmail)
      const hotelMailOptions = {
        from: `"Hotel Sherpa Soul Website" <${hotelEmail}>`,
        to: staffRecipients,
        replyTo: `"${name}" <${email}>`,
        subject: `📩 New Website Inquiry from ${name}${subject ? `: ${subject}` : ""}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #1e293b; padding: 24px; text-align: center; border-bottom: 3px solid #d97706;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">Hotel Sherpa Soul</h1>
              <p style="color: #cbd5e1; margin: 6px 0 0 0; font-size: 13px;">New Guest Inquiry Received</p>
            </div>
            
            <div style="padding: 24px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; margin-bottom: 12px; color: #0f172a; font-size: 15px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">Guest Details</h3>
                <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #d97706; text-decoration: none;">${email}</a></p>
                ${phone ? `<p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #d97706; text-decoration: none;">${phone}</a></p>` : ""}
                <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>Date:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })} (NPT)</p>
              </div>

              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #d97706; border-radius: 4px; padding: 16px; margin-bottom: 24px;">
                <h4 style="margin-top: 0; margin-bottom: 8px; color: #0f172a; font-size: 14px;">Message Content:</h4>
                <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${email}?subject=Re: Your Inquiry to Hotel Sherpa Soul" style="background: #d97706; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; display: inline-block;">Reply to Guest</a>
                ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="background: #25D366; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; display: inline-block; margin-left: 10px;">Chat on WhatsApp</a>` : ""}
              </div>
            </div>

            <div style="background: #f1f5f9; padding: 16px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0;">Hotel Sherpa Soul Direct Reservation & Inquiry System</p>
              <p style="margin: 4px 0 0 0;">${hotelAddress} | Phone: ${hotelPhone}</p>
            </div>
          </div>
        `,
      };

      // Email 2: Automated confirmation copy sent to Guest
      const guestMailOptions = {
        from: `"Hotel Sherpa Soul" <${hotelEmail}>`,
        to: email,
        replyTo: hotelEmail,
        subject: `Thank you for contacting Hotel Sherpa Soul, Kathmandu`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #1e293b; padding: 28px; text-align: center; border-bottom: 3px solid #d97706;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Hotel Sherpa Soul</h1>
              <p style="color: #cbd5e1; margin: 6px 0 0 0; font-size: 13px;">No Restaurant. No Noise. Sleep Well.</p>
            </div>

            <div style="padding: 28px;">
              <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Namaste ${name},</h2>
              <p style="color: #334155; line-height: 1.6; font-size: 14px;">
                Thank you for reaching out to <strong>Hotel Sherpa Soul</strong>. We have received your inquiry and our team is currently reviewing your message.
              </p>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Your Message Summary:</p>
                <p style="color: #334155; font-size: 13px; line-height: 1.5; margin: 0; font-style: italic;">"${message}"</p>
              </div>

              <p style="color: #334155; line-height: 1.6; font-size: 14px;">
                We typically respond within a few hours. If your requirement is urgent or you need instant room booking confirmation, feel free to contact our 24/7 Front Desk directly via WhatsApp or phone.
              </p>

              <div style="text-align: center; margin: 24px 0;">
                <a href="https://wa.me/9779851068219?text=Hello%20Hotel%20Sherpa%20Soul,%20I%20sent%20an%20inquiry%20via%20website" style="background: #25D366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block;">
                  💬 Instant WhatsApp Chat (+977-9851068219)
                </a>
              </div>

              <p style="color: #64748b; font-size: 13px; margin-top: 24px;">
                Warm regards,<br />
                <strong>Guest Relations Team</strong><br />
                Hotel Sherpa Soul, Thamel, Kathmandu
              </p>
            </div>

            <div style="background: #f1f5f9; padding: 16px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0;">${hotelAddress}</p>
              <p style="margin: 4px 0 0 0;">Email: <a href="mailto:${hotelEmail}" style="color: #d97706;">${hotelEmail}</a> | Phone: ${hotelPhone}</p>
              <p style="margin: 4px 0 0 0;"><a href="https://hotelsherpasoul.com" style="color: #d97706; text-decoration: none;">www.hotelsherpasoul.com</a></p>
            </div>
          </div>
        `,
      };

      // Await both hotel staff alert and guest auto-responder using Promise.allSettled
      // This prevents serverless functions from killing the process before all emails are dispatched
      await Promise.allSettled([
        sendMailUnified(hotelMailOptions),
        sendMailUnified(guestMailOptions).catch((err) => {
          console.warn("Guest auto-responder delivery failed:", err.message);
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully to Hotel Sherpa Soul!",
      });
    }

    // 2. Room Booking Confirmation Notification
    if (type === "booking") {
      const b = booking || req.body;
      const guestName = b.guestName || b.name || "Guest";
      const guestEmail = b.email;
      const guestPhone = b.phone || b.number || "N/A";
      const roomName = b.roomName || b.roomType || "Deluxe Room";
      const checkIn = b.checkIn || b.checkInDate || "N/A";
      const checkOut = b.checkOut || b.checkOutDate || "N/A";
      const bookingRef = b.bookingRef || b.id || `HSS-${Date.now().toString().slice(-6)}`;
      const totalPrice = b.totalPrice || b.totalAmount || "N/A";
      const roomsCount = b.numberOfRooms || 1;
      const guestsCount = b.numberOfGuests || b.numberOfPeople || 1;
      const specialRequests = b.specialRequests || "None";

      // Booking Alert for Hotel Staff
      const staffBookingMail = {
        from: `"Hotel Sherpa Soul Reservation" <${hotelEmail}>`,
        to: staffRecipients,
        replyTo: guestEmail ? `"${guestName}" <${guestEmail}>` : hotelEmail,
        subject: `🔔 NEW RESERVATION: ${roomName} - ${guestName} [${bookingRef}]`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #1e293b; padding: 24px; text-align: center; border-bottom: 3px solid #10b981;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">NEW BOOKING ALERT</h1>
              <p style="color: #a7f3d0; margin: 6px 0 0 0; font-size: 14px; font-weight: bold;">Reference: #${bookingRef}</p>
            </div>

            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Guest Name:</strong></td><td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${guestName}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 10px 0; color: #0f172a;"><a href="tel:${guestPhone}">${guestPhone}</a></td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Email:</strong></td><td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${guestEmail}">${guestEmail}</a></td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Room:</strong></td><td style="padding: 10px 0; color: #0f172a;">${roomName} (${roomsCount} Room${roomsCount > 1 ? "s" : ""})</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Check-In:</strong></td><td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${checkIn}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Check-Out:</strong></td><td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${checkOut}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Guests:</strong></td><td style="padding: 10px 0; color: #0f172a;">${guestsCount}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #10b981; font-weight: bold; font-size: 16px;">NPR ${totalPrice}</td></tr>
                <tr><td style="padding: 10px 0; color: #64748b;"><strong>Special Requests:</strong></td><td style="padding: 10px 0; color: #0f172a;">${specialRequests}</td></tr>
              </table>

              <div style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/${guestPhone.replace(/[^0-9]/g, "")}" style="background: #25D366; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; display: inline-block;">WhatsApp Guest</a>
              </div>
            </div>
          </div>
        `,
      };

      const bookingMailPromises = [sendMailUnified(staffBookingMail)];

      // If guest email is provided, send them a confirmation voucher
      if (guestEmail && guestEmail.includes("@")) {
        const guestVoucherMail = {
          from: `"Hotel Sherpa Soul" <${hotelEmail}>`,
          to: guestEmail,
          replyTo: hotelEmail,
          subject: `🏨 Booking Confirmation - Hotel Sherpa Soul, Kathmandu [#${bookingRef}]`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background: #1e293b; padding: 28px; text-align: center; border-bottom: 3px solid #d97706;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Hotel Sherpa Soul</h1>
                <p style="color: #cbd5e1; margin: 4px 0 0 0; font-size: 13px;">Booking Confirmation Voucher</p>
              </div>

              <div style="padding: 28px;">
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
                  <h2 style="color: #065f46; margin: 0 0 4px 0; font-size: 18px;">Reservation Confirmed!</h2>
                  <p style="color: #047857; margin: 0; font-size: 14px;">Booking Reference: <strong>#${bookingRef}</strong></p>
                </div>

                <p style="color: #334155; font-size: 14px; line-height: 1.6;">
                  Dear <strong>${guestName}</strong>,<br />
                  Thank you for booking directly with Hotel Sherpa Soul. We look forward to welcoming you to our peaceful boutique hotel in Thamel, Kathmandu.
                </p>

                <h3 style="color: #0f172a; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">Booking Summary</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Room:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${roomName} (${roomsCount} Room${roomsCount > 1 ? "s" : ""})</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Check-In Date:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${checkIn} (from 14:00)</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Check-Out Date:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${checkOut} (until 12:00)</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Total Amount:</td><td style="padding: 8px 0; color: #d97706; font-weight: bold;">NPR ${totalPrice}</td></tr>
                </table>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 24px 0;">
                  <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 13px;">Hotel Location & Contact:</h4>
                  <p style="margin: 4px 0; color: #475569; font-size: 13px;">📍 ${hotelAddress}</p>
                  <p style="margin: 4px 0; color: #475569; font-size: 13px;">📞 24/7 Front Desk: ${hotelPhone}</p>
                  <p style="margin: 4px 0; color: #475569; font-size: 13px;">✉️ Email: ${hotelEmail}</p>
                </div>

                <div style="text-align: center; margin: 24px 0;">
                  <a href="https://wa.me/9779851068219?text=Hello%20Hotel%20Sherpa%20Soul,%20I%20have%20a%20confirmed%20booking%20%23${bookingRef}" style="background: #25D366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block;">
                    Need Airport Pickup? Message on WhatsApp
                  </a>
                </div>
              </div>

              <div style="background: #f1f5f9; padding: 16px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0;">Hotel Sherpa Soul | No Restaurant. No Noise. Sleep Well.</p>
              </div>
            </div>
          `,
        };

        bookingMailPromises.push(
          sendMailUnified(guestVoucherMail).catch((err) => {
            console.warn("Guest voucher delivery notice:", err.message);
          })
        );
      }

      // Await both hotel alert and guest voucher before closing serverless response
      await Promise.allSettled(bookingMailPromises);

      return res.status(200).json({
        success: true,
        message: "Booking confirmation email sent successfully!",
      });
    }

    return res.status(400).json({ success: false, error: "Invalid email request type" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send email. Please contact front desk directly.",
      details: error.message,
    });
  }
}
