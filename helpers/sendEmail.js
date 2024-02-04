const nodemailer = require("nodemailer");

const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "lutsenko.89@meta.ua",
    pass: META_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "lutsenko.89@meta.ua" };

  await transport
    .sendMail(email)
    .then(() => console.log("success"))
    .catch((error) => console.log("ERROR:", error.message));
};

module.exports = sendEmail;
