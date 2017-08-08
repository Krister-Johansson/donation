var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var ipn = require('paypal-ipn');
var payment = require('../models/payment');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/thankyou', function (req, res, next) {
  console.log('----------');
  console.log(req.body);
  console.log('----------');
  res.render('index');
});

router.post('/ipn', function (req, res, next) {
  ipn.verify(req.body, { 'allow_sandbox': true }, function callback(err, msg) {
    console.log(msg);
    if (err) {
      console.error(err);
    } else {
      console.log(req.body.custom);
      if (req.body.payment_status == 'Completed') {
        console.log('DONE!!!!');
      }
    }
    res.sendStatus(200);
  });
});

router.get('/pay', function (req, res, next) {
  res.redirect(process.env.PAYPAL_SANDBOX_URL + '?' + querystring.stringify({
    business: 'krister.johansson@outlook.com',
    cmd: '_donations',
    notify_url: process.env.SERVER_URL + '/ipn',
    return: process.env.SERVER_URL + '/thankyou',
    rm: 2,
    no_note: 0,
    cbt: 'Go Back To The Site',
    no_shipping: 1,
    lc: 'US',
    currency_code: 'USD',
    amount: 1,
    custom: 'abc-123-def-456-ghi-789-jkl'
  }));
});

module.exports = router;
