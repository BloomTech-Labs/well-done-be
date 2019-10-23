const request = require("supertest");
const server = require('../server')
const db = require("../../data/dbConfig");
require("dotenv").config();

describe("organizations router", () => {
  beforeEach(async () => {
    await db("organizations").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

  
});

//Test POST an org
describe('POST /api/orgs', function (){
  let org = {
    "id": "1",
    "org_name": "ABC",
    "headquarter_city": "DEF"
  }
  it('respond with 200 created', function (done){
    request(server)
        .post('/api/orgs')
        .send(org)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err)=> {
          if (err) return done(err);
          done()
        })
  })
})

//Test GET all orgs 
describe('GET /api/orgs', function (){
  it('respond with json containing a list of all orgs', function (done){
    request(server)
        .get('/api/orgs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done)
  })
})

//Test GET org by id
describe('GET /api/orgs/:id', function (){
  it('respond with json containing a single org', function (done){
    request(server)
        .get('/api/orgs/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done)
  })

  it('respond with json org not found', function (done){
    request(server)
        .get('/api/orgs/2019')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err) => {
          if(err) return done(err);
          done();
        })
  })
})

