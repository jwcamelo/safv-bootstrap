const nodemailer = require('nodemailer');
const SMPT_CONFIG = require('./config/smtp')

const transport = nodemailer.createTransport({
  host: SMPT_CONFIG.host,
  port: SMPT_CONFIG.port,
  secure: false,
  auth: {
    user: SMPT_CONFIG.user,
    pass: SMPT_CONFIG.pass
  },
  tls: {
    rejectUnauthorized: false,
  }
})

module.exports = {
  sendEmail(assunto, texto, recebedor) {
    transport.sendMail({
      text: texto,
      subject: assunto,
      from: "SAFV << safvses@outlook.com >>",
      to: recebedor
    }).then(info => {
      console.log(info);
    })
  }
}
