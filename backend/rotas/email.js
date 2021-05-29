const express = require("express");
const router = express.Router();
const transport = require("nodemailer");

router.post("", async (req, res, next) => {
  transporter = await transport.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "zackery.grady@ethereal.email",
      pass: "8PumHAhhH5u33SYtDw",
    },
  });

  await transporter
    .sendMail({
      from: `"${req.body.nomeUsuario}" <${req.body.emailUsuario}>`,
      to: "muv@email.com",
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
