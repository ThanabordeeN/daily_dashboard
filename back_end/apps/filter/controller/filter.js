const express = require('express');
const router = express.Router();

const filterProcess = require('../services/filterProcess.js');
const price_sum = require('../services/price_sum.js');
const alqty = require('../services/alqty_sum.js');
const accum_price = require('../services/accum_price.js');
router.post('/', function(req, res, next) {
  const values = req.body;
  const data = filterProcess(values);
  const state = {
    price_Sum: price_sum(data),
    alqty_Sum: alqty(data),
    accum_price: accum_price(values,price_sum(data)),
  };
  
  //console.log('Data sent:', state);
  // Respond with the data as JSON
  console.log('Data sent:', state);

  // Check if the objects are empty
  if (Object.keys(price_sum(data)).length === 0 || Object.keys(alqty(data)).length === 0) {
      console.log('Cannot send empty data');
      return;
  }

  // If the objects are not empty, send the data
  res.send(state); // Uncomment this line if you're in an Express.js context
});

module.exports = router;