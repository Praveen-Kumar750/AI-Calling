import { sendEmail } from "./config/emailConfig.js";

sendEmail("soyelrana224@example.com", "Test Email", "This is a test email")
  .then(() => console.log("Email sent successfully!"))
  .catch((err) => console.error("Error:", err));
