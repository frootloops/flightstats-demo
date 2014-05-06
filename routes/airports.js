var router = require('express').Router();
var Airport = require('../models/airport.js')

/* GET airports listing. */
router.get('/', function(req, res, next) {
  var query = req.param('q');

  Airport.fetch(query, function(e, airports) {
    if (e) return next(e);

    res.json(airports);
  });
});

module.exports = router;
