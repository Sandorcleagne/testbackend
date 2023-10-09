const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();
const port = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "harshjoshioffice@gmail.com",
    pass: "vmqu wuwm aicc goip",
  },
  secure: true,
});

app.use("/v1", route);
route.post("/text-email", (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: "harshjoshioffice@gmail.com", // sender address
    to: to, // list of receivers
    subject: subject,
    text: text,
    html: "<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>",
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else res.send("Mail Sent");
  });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
