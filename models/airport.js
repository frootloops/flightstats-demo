var _ = require('underscore');
var request = require('request');

var Airport = function() {
  this.apiHost = process.env.API_HOST;
  this.apiUrl = process.env.API_URL;
  this.requestUrl = this.apiHost + this.apiUrl;
  this.cache = [];
};

Airport.prototype.fetchRemote = function(done) {
  if (this.cache.length > 0) return done(null, this.cache);

  var onComplete = _.bind(function (error, response, body) {
    if (error) return done(error);

    this.cache  = _.map(body['airports'], function(a) {
      return { val:  a['city'] + ' (' + a['fs'] + ')' }
    });

    return done(null, this.cache);
  }, this);

  request({ url: this.requestUrl, json: true }, onComplete);
};

Airport.prototype.fetch = function(query, done) {
  this.fetchRemote(function(e, airports) {
    if (e) return done(e);

    var result = _.filter(airports, function(a) {
      return !query || a.val.toLowerCase().indexOf(query.toLowerCase()) > -1
    });

    done(null, result);
  });

};

module.exports = new Airport;
