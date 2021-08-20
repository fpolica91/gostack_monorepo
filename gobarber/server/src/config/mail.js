export default {
  // host: "smtp.mailtrap.io",
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    // user: "e387eb595544a1",
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  default: {
    from: "Team GoBarber <noreply@gobarber.com>"
  }
};

// MAILTRAP(DEV)
