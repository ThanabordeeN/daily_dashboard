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
  console.log('Data received:', values);
  const data = filterProcess(values);
  if (data === null) {
    const state = {
      price_Sum: 0,
      alqty_Sum: 0,
      accum_price: 0,
      ogqty_Sum: 0,
      order_price: 0,
      accum_item: 0};
    res.send(state); // Uncomment this line if you're in an Express.js context
  }
  else {
    console.log('Data is not null');
    const state = {
      price_Sum: price_sum(data),
      alqty_Sum: alqty(data),
      accum_price: accum_price(values,price_sum(data)),
      ogqty_Sum: ogqty(data),
      order_price: order_price(data),
      accum_item: accum_item(values,alqty(data))
    };
    res.send(state); // Uncomment this line if you're in an Express.js context
  }

  
  //console.log('Data sent:', state);
  // Respond with the data as JSON

  // Check if the objects are empty

  // If the objects are not empty, send the data
});

module.exports = router;