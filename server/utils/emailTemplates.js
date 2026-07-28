/**
 * Premium HTML Email Templates for ASAHI Japanese Learning
 */

// Global Layout Wrapper
const getLayoutWrapper = (title, contentHTML) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f1f5f9;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
        border: 1px solid #e2e8f0;
      }
      .email-header {
        background-color: #0f172a;
        padding: 32px;
        text-align: center;
        border-bottom: 3px solid #D91C3C;
      }
      .email-header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 24px;
        font-weight: 800;
        letter-spacing: 1px;
      }
      .email-header p {
        color: #94a3b8;
        margin: 6px 0 0 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
      .email-body {
        padding: 40px 32px;
        color: #334155;
        line-height: 1.6;
      }
      .email-footer {
        background-color: #f8fafc;
        padding: 24px 32px;
        text-align: center;
        border-top: 1px solid #e2e8f0;
        font-size: 12px;
        color: #64748b;
      }
      .email-footer a {
        color: #D91C3C;
        text-decoration: none;
        font-weight: 600;
      }
      .btn {
        display: inline-block;
        background-color: #D91C3C;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 28px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 15px;
        margin: 20px 0;
        box-shadow: 0 2px 4px rgba(217, 28, 60, 0.25);
      }
      .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>ASAHI BILINGUAL SERVICES</h1>
        <p>Master Japanese Language & Learning</p>
      </div>
      <div class="email-body">
        ${contentHTML}
      </div>
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} ASAHI Japanese Language Academy. All rights reserved.</p>
        <p>
          🌐 <a href="https://asahigs.com" target="_blank">asahigs.com</a> | 
          📧 <a href="mailto:support@asahigs.com">support@asahigs.com</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// 1. OTP Verification Template
exports.getOTPTemplate = (otp, type = "verification") => {
  const isReset = type === "reset";
  const title = isReset ? "Reset Your Password" : "Verify Your Email";
  const description = isReset
    ? "We received a request to reset your password. Use the verification code below to authorize this action."
    : "To finalize registration and securely verify your account, please enter the following verification code.";

  const content = `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">${title} 🔐</h2>
    <p style="font-size: 15px; color: #475569;">Hello,</p>
    <p style="font-size: 15px; color: #475569; line-height: 1.6;">${description}</p>
    
    <div style="text-align: center; margin: 35px 0;">
      <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 18px; display: inline-block;">
        <span style="font-size: 32px; font-weight: 800; color: #D91C3C; letter-spacing: 5px; font-family: monospace;">${otp}</span>
      </div>
      <p style="font-size: 12px; color: #64748b; margin-top: 10px;">This OTP is valid for <b>5 minutes</b>.</p>
    </div>

    <p style="font-size: 14px; color: #ef4444; background: #fef2f2; border: 1px solid #fee2e2; padding: 10px 15px; border-radius: 6px;">
      ⚠️ <strong>Important Security Note:</strong> Never share this OTP verification code with anyone, including ASAHI support staff or counselors.
    </p>

    <p style="font-size: 14px; color: #64748b; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      Warm regards,<br>
      <strong>Team ASAHI 🇯🇵</strong>
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 2. Student & Service Enquiry Template (Customized Dynamically)
exports.getEnquiryTemplate = (name, email, phone, exam, level, message) => {
  const servicePrefix = "I am interested in your service: ";
  const isService = message && message.startsWith(servicePrefix);
  const serviceName = isService ? message.substring(servicePrefix.length) : "";

  let title = "We Have Received Your Enquiry";
  let greeting = `Hello ${name},`;
  let intro = `Thank you for contacting ASAHI Bilingual Services. We have successfully registered your enrollment enquiry.`;
  let detailsText = `An academic counselor is reviewing your profile and will connect with you via email or phone shortly to assist you in choosing the ideal learning program.`;
  let programTrack = `${exam || "N/A"} (${level || "N/A"})`;
  let closing = `We look forward to embarking on this Japanese learning journey with you!`;
  let signature = `
    Best Regards,<br>
    <strong>Enrollments Counselor</strong><br>
    <span style="font-size: 13px;">ASAHI Language Academy</span>
  `;

  if (isService) {
    title = `Service Request: ${serviceName}`;
    greeting = `Dear ${name},`;
    intro = `Thank you for reaching out to ASAHI Bilingual Services. We have successfully received your service inquiry for <strong>${serviceName}</strong>.`;
    detailsText = `Our business solutions team / program coordinators are reviewing your request. We will connect with you shortly to discuss your custom project requirements, timelines, and proposal details.`;
    programTrack = `Service Request: ${serviceName}`;
    closing = `We look forward to collaborating with you and delivering outstanding bilingual results!`;
    signature = `
      Best Regards,<br>
      <strong>Business Solutions Team</strong><br>
      <span style="font-size: 13px;">ASAHI Bilingual Services</span>
    `;
  } else if (exam === "JLPT" || exam === "NAT") {
    intro = `Thank you for contacting ASAHI Bilingual Services. We have successfully registered your enrollment enquiry for the <strong>${exam} ${level}</strong> preparation course.`;
  }

  const content = `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">${greeting}</h2>
    <p style="font-size: 15px; color: #475569; line-height: 1.6;">
      ${intro}
    </p>
    <p style="font-size: 15px; color: #475569; line-height: 1.6;">
      ${detailsText}
    </p>

    <div style="background-color: #f8fafc; border-left: 4px solid #D91C3C; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #0f172a; font-weight: 700;">Submitted Lead Details:</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr>
          <td style="padding: 6px 0; font-weight: 600; width: 140px;">Name:</td>
          <td style="padding: 6px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Email:</td>
          <td style="padding: 6px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Phone:</td>
          <td style="padding: 6px 0;">${phone || "Not Provided"}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Category:</td>
          <td style="padding: 6px 0;">${programTrack}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Message Details:</td>
          <td style="padding: 6px 0; line-height: 1.5;">${message || "N/A"}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 15px; color: #475569; line-height: 1.6;">
      ${closing}
    </p>

    <p style="font-size: 14px; color: #64748b; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      ${signature}
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 3. Admin Notification: Student/Service Lead Enquiry
exports.getAdminEnquiryTemplate = (name, email, phone, exam, level, message) => {
  const servicePrefix = "I am interested in your service: ";
  const isService = message && message.startsWith(servicePrefix);
  const serviceName = isService ? message.substring(servicePrefix.length) : "";

  let title = "New Lead Enquiry Received";
  let alertHeader = "New Student Enquiry 📢";
  let intro = `A prospective learner has submitted an enquiry on the portal. Please assign a coordinator to connect within 24 hours.`;
  let focusLabel = "Course Focus:";
  let focusValue = `${exam || "N/A"} - Level ${level || "N/A"}`;

  if (isService) {
    title = `Service Request Alert: ${serviceName}`;
    alertHeader = "New B2B/B2C Service Request 💼";
    intro = `A client has requested professional services for <strong>${serviceName}</strong>. Please assign a business coordinator/accounts manager to connect and compile a proposal within 12 hours.`;
    focusLabel = "Requested Service:";
    focusValue = serviceName;
  }

  const content = `
    <h2 style="color: #ef4444; margin-top: 0; font-size: 20px;">${alertHeader}</h2>
    <p style="font-size: 15px; color: #475569;">Hi Admin,</p>
    <p style="font-size: 15px; color: #475569;">${intro}</p>

    <div style="background-color: #f8fafc; border-left: 4px solid #0f172a; padding: 20px; margin: 25px 0; border-radius: 4px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr>
          <td style="padding: 6px 0; font-weight: 600; width: 140px;">Applicant Name:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Email:</td>
          <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Phone:</td>
          <td style="padding: 6px 0;">${phone || "Not Provided"}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">${focusLabel}</td>
          <td style="padding: 6px 0; font-weight: bold; color: #b30012;">${focusValue}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Enquiry Msg:</td>
          <td style="padding: 6px 0; line-height: 1.5; font-style: italic;">"${message || "None"}"</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px;">
      Notification System • Generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 4. Password Reset Success Template
exports.getPasswordResetSuccessTemplate = (name) => {
  const title = "Password Changed Successfully";
  const content = `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Password Updated 🔑</h2>
    <p style="font-size: 15px; color: #475569;">Hello ${name},</p>
    <p style="font-size: 15px; color: #475569; line-height: 1.6;">
      This email is to confirm that the password for your ASAHI account has been successfully updated.
    </p>
    <p style="font-size: 15px; color: #475569; line-height: 1.6;">
      You can now log in using your new credentials.
    </p>

    <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 15px; margin: 25px 0;">
      <p style="margin: 0; font-size: 13.5px; color: #b45309; line-height: 1.5;">
        <strong>Didn't make this change?</strong><br>
        If you did not authorize this change, please reset your password immediately or contact our support desk at <a href="mailto:support@asahigs.com" style="color: #b45309; font-weight: bold;">support@asahigs.com</a> to secure your profile.
      </p>
    </div>

    <p style="font-size: 14px; color: #64748b; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      Regards,<br>
      <strong>Team ASAHI 🇯🇵</strong>
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 5. Order Confirmation Receipt Template
exports.getOrderConfirmationTemplate = (order) => {
  const title = `Order Confirmation #${order.orderId}`;
  
  const productRowsHTML = order.products.map(p => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #334155;">
        <strong>${p.title}</strong>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #334155; text-align: center;">
        ${p.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: 600; text-align: right;">
        ₹${p.price * p.quantity}
      </td>
    </tr>
  `).join("");

  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: #ecfdf5; color: #059669; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; text-transform: uppercase;">
        Order Confirmed ✅
      </div>
      <h2 style="color: #0f172a; margin-top: 15px; font-size: 22px;">Thank you for your order!</h2>
      <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">We've received your order and are preparing it for shipment. We have also attached your official invoice PDF to this email.</p>
    </div>

    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
      <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">Order Summary:</h4>
      <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Order ID:</strong> #${order.orderId}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;"><strong>Placed On:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    </div>

    <h4 style="color: #0f172a; font-size: 16px; margin: 0 0 12px 0;">Purchased Books:</h4>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <thead>
        <tr style="background-color: #f1f5f9;">
          <th style="padding: 10px; font-size: 12px; font-weight: 700; color: #475569; text-align: left; text-transform: uppercase;">Item Description</th>
          <th style="padding: 10px; font-size: 12px; font-weight: 700; color: #475569; text-align: center; text-transform: uppercase; width: 60px;">Qty</th>
          <th style="padding: 10px; font-size: 12px; font-weight: 700; color: #475569; text-align: right; text-transform: uppercase; width: 100px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${productRowsHTML}
        <tr>
          <td colspan="2" style="padding: 16px 12px 6px 12px; font-size: 14px; color: #64748b; font-weight: 600; text-align: right;">Total Amount paid:</td>
          <td style="padding: 16px 12px 6px 12px; font-size: 16px; color: #D91C3C; font-weight: bold; text-align: right;">₹${order.totalAmount}</td>
        </tr>
      </tbody>
    </table>

    <div style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
      <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">Shipping Address:</h4>
      <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5;">
        ${order.customer.name}<br>
        ${order.shippingAddress.address}<br>
        ${order.shippingAddress.city} - ${order.shippingAddress.pincode}<br>
        Phone: ${order.customer.phone}
      </p>
    </div>

    <p style="font-size: 14px; color: #64748b; margin-top: 35px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      Arigatō gozaimasu!<br>
      <strong>ASAHI Bookstore Team 🇯🇵</strong>
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 6. Order Cancellation Template
exports.getOrderCancelledTemplate = (order) => {
  const title = `Order Cancelled - #${order.orderId}`;
  
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: #fef2f2; color: #ef4444; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; text-transform: uppercase;">
        Order Cancelled 🚫
      </div>
      <h2 style="color: #0f172a; margin-top: 15px; font-size: 22px;">Cancellation Confirmation</h2>
      <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">As requested, your order #${order.orderId} has been cancelled successfully.</p>
    </div>

    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #ef4444;">
      <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Order Reference:</strong> #${order.orderId}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;"><strong>Cancellation Date:</strong> ${new Date().toLocaleDateString()}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;"><strong>Cancelled Amount:</strong> ₹${order.totalAmount}</p>
    </div>

    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
      If payment was already deducted, it will be refunded back to your source account automatically in 5-7 business days. If you did not request this cancellation, please contact our support desk immediately.
    </p>

    <p style="font-size: 14px; color: #64748b; margin-top: 35px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      Regards,<br>
      <strong>Team ASAHI 🇯🇵</strong>
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 7. Order Status Update (Confirmed, Shipped, Delivered) Template
exports.getOrderStatusUpdateTemplate = (order, status, statusMessage, color = "#3b82f6") => {
  const title = `Order Status Update: ${status}`;
  
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${color}15; color: ${color}; padding: 6px 18px; border-radius: 20px; font-weight: 700; font-size: 13px; text-transform: uppercase;">
        Order ${status}
      </div>
      <h2 style="color: #0f172a; margin-top: 15px; font-size: 22px;">Tracking status update</h2>
      <p style="color: #64748b; font-size: 14.5px; margin: 5px 0 0 0;">An update has been posted to your order shipment.</p>
    </div>

    <div style="background-color: #f8fafc; border-left: 5px solid ${color}; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
      <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Order ID:</strong> #${order.orderId}</p>
      <p style="margin: 5px 0 0 0; font-size: 15px; color: #0f172a;"><strong>Current Status:</strong> <span style="color: ${color}; font-weight: bold;">${status}</span></p>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #475569; line-height: 1.5; font-style: italic;">"${statusMessage}"</p>
    </div>

    <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; margin-bottom: 25px;">
      <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14.5px;">Shipping Destination:</h4>
      <p style="margin: 0; font-size: 13.5px; color: #64748b; line-height: 1.5;">
        ${order.customer.name}<br>
        ${order.shippingAddress.address}<br>
        ${order.shippingAddress.city} - ${order.shippingAddress.pincode}
      </p>
    </div>

    <p style="font-size: 14px; color: #64748b; margin-top: 35px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      Thank you for choosing ASAHI,<br>
      <strong>ASAHI Bookstore Team 🇯🇵</strong>
    </p>
  `;

  return getLayoutWrapper(title, content);
};

// 8. Admin Notification: New Order Alert
exports.getAdminNewOrderTemplate = (order) => {
  const title = `New Order Placed - #${order.orderId}`;
  
  const content = `
    <h2 style="color: #059669; margin-top: 0; font-size: 20px;">New Order Alert! 📦</h2>
    <p style="font-size: 15px; color: #475569;">Hello Admin Team,</p>
    <p style="font-size: 15px; color: #475569;">A new book purchase has been completed. The details are compiled below for dispatch routing.</p>

    <div style="background-color: #f8fafc; border-left: 4px solid #059669; padding: 20px; margin: 25px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr>
          <td style="padding: 6px 0; font-weight: 600; width: 140px;">Order ID:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">#${order.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Customer Name:</td>
          <td style="padding: 6px 0;">${order.customer.name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Contact Phone:</td>
          <td style="padding: 6px 0;">${order.customer.phone}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Order Total:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #059669;">₹${order.totalAmount} (${order.paymentMethod})</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Delivery Dest:</td>
          <td style="padding: 6px 0; line-height: 1.5;">
            ${order.shippingAddress.address}, ${order.shippingAddress.city} - ${order.shippingAddress.pincode}
          </td>
        </tr>
      </table>
    </div>

    <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px;">
      Order Automation • Generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    </p>
  `;

  return getLayoutWrapper(title, content);
};
