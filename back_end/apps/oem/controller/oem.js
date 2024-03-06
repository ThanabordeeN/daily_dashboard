const express = require('express');
const fetchData = require('../services/oemdbfetch');

const router = express.Router();

router.get('/', function(req, res, next) {
  fetchData().then(fetchData => {
    const data = fetchData;

    res.json(data);

  }).catch(error => {
    console.error(error); // this will log any error that occurred during fetching
  });
});

module.exports = router;
