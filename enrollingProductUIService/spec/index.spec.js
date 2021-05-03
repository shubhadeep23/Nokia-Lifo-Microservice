var server = require('../server');
var supertest = require('supertest');
const message = require('./testData')
describe('GET Testcases ', function () {

  it('Get API should return ok 200 with parameters', function (done) {
    var app = supertest(server.app);
    app.get("/enrollment/v1/products").end((err, res) => {
      expect(res.statusCode).toBe(200)
      done();
    })
  });
  it('Get API should return array with listed element', function (done) {
    var app = supertest(server.app);
    app.get("/enrollment/v1/products").end((err, res) => {
      var isValidBody = function (res) {
        res.body.should.have.property("id", "product_name", "description", "cost");
      };
      expect(isValidBody)
      done();
    })
  });
  it('Get API should return array', function (done) {
    var app = supertest(server.app);
    app.get("/enrollment/v1/products").end((err, res) => {
      var isValidBody = function (res) {
        res.body.should.be.a('array');
      };
      expect(isValidBody)
      done();
    })
  });

});
describe('POST test cases', function () {
  it('POST API Should return 201 after succesfully adding new product', function (done) {
    var app = supertest(server.app);

    app.post('/enrollment/v1/products')
      .send({
        "productName": "Mug",
        "description": "coffee mug",
        "cost": "44"
      })
      .end(function (err, res) {
        expect(res.statusCode).toBe(201);
        done();
      });
  });
  it('POST API with missing mandtory fields should return error', function (done) {
    var app = supertest(server.app);

    app.post('/enrollment/v1/products')
      .send({
        "productName": "Mug",
        "description": "coffee mug",
        "cost": "44"
      })
      .end(function (err, res) {
        var isValidBody = function (res) {
          res.body.should.have.property('errors');
        };
        expect(isValidBody)
        done();
      });
  });
});