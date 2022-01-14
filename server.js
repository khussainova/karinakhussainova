require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { check, validationResult } = require('express-validator');

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post(
  '/',
  urlencodedParser,
  [
    check('name').notEmpty(),
    check('email').notEmpty().isEmail(),
    check('subject').notEmpty(),
    check('message').notEmpty(),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: process.env.MAIL_NAME,
      subject: `Message from ${req.body.email}: ${req.body.subject}`,
      text: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('error');
      } else {
        console.log('Email send: ' + info.response);
        res.send('success');
      }
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
