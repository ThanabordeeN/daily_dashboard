const express = require('express');
const router = express.Router();

const filterProcess = require('../services/filterProcess.js');
const price_sum = require('../services/price_sum.js');
const alqty = require('../services/alqty_sum.js');
const ogqty = require('../services/order_sum.js');
const accum_price = require('../services/accum_price.js');
const order_price = require('../services/order_price.js');
const accum_item = require('../services/accum_item.js');
router.post('/', function(req, res, next) {
  const values = req.body;
  const data = filterProcess(values);

  const state = {
    price_Sum: price_sum(data),
    alqty_Sum: alqty(data),
    accum_price: accum_price(values,price_sum(data)),
    ogqty_Sum: ogqty(data),
    order_price: order_price(data),
    accum_item: accum_item(values,alqty(data))

  };
  
  //console.log('Data sent:', state);
  // Respond with the data as JSON

  // Check if the objects are empty
  if (Object.keys(price_sum(data)).length === 0 || Object.keys(alqty(data)).length === 0) {
      console.log('Cannot send empty data');
      return;
  }

  // If the objects are not empty, send the data
  res.send(state); // Uncomment this line if you're in an Express.js context
});

module.exports = router;