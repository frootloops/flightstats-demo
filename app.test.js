var request = require('supertest');
var app = require('./app');
var expect = require('expect.js');

describe("airport search", function() {
  beforeEach(function() {
    var nock = require('nock');
    var Airport = require('./models/airport.js');
    var json = { airports: [
        { city: 'Moscow', fs: 'SVO' },
        { city: 'New York', fs: 'JFK' }
      ] };
    nock(Airport.apiHost).get(Airport.apiUrl).reply(200, json)
  });

  it("get all airports", function(done) {
    request(app)
      .get('/airports')
      .expect(200)
      .end(function(e, res) {
        expect(res.body.length).to.eql(2)
        done(e)
      });
  });

  it("get SVO only", function(done) {
    request(app)
      .get('/airports?q=svo')
      .expect(200)
      .end(function(e, res) {
        expect(res.body).to.eql([ { val: 'Moscow (SVO)' } ])
        done(e)
      });
  });

  it("not found", function(done) {
    request(app)
      .get('/airports?q=42')
      .expect(200)
      .end(function(e, res) {
        expect(res.body).to.eql([])
        done(e)
      });
  });

})
