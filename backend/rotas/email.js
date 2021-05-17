const express = require("express");
const router = express.Router();
const transport = require("nodemailer");

router.post("", (req, res, next) => {
  transporter = transport.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "syble.hayes94@ethereal.email",
      pass: "8uSbszJ3C9gMyBEkmB",
    },
  });

  transporter
    .sendMail({
      from: `"${req.body.nomeUsuario}" <${req.body.emailUsuario}>`,
      to: "muvequipe@gmail.com",
      subject: req.body.assunto,
      text: req.body.mensagem,
      html: req.body.mensagem,
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({ mensagem: "Email enviado com sucesso" });
});

module.exports = router;
