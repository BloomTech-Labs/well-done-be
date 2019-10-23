const request = require("supertest");
const server = require('../server')

describe("history router", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

  //Test POST a history
  describe('POST /api/history', function (){
    let history = {
      "id": "4",
      "date": "2019-05-22",
      "count": "2",
      "total": "789456",
      "status": "3",
      "sensor_id": "1",
      "pad_seconds": "4000",
      "pad_counts": "15",
      "reported_percent": "12"
    }
    it('respond with 200 created', function (done){
      request(server)
          .post('/api/history')
          .send(history)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err)=> {
            if (err) return done(err);
            done()
          })
    })
  })
  
  //Test GET all history
  describe('GET /api/history', function (){
    it('respond with json containing a list of all history', function (done){
      request(server)
          .get('/api/history')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200,done)
    })
  })

  //Test GET history by id
  describe('GET /api/history/:id', function (){
    it('respond with json containing a single history', function (done){
      request(server)
          .get('/api/history/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200,done)
    })
  
    it('respond with json history not found', function (done){
      request(server)
          .get('/api/history/1945')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err) => {
            if(err) return done(err);
            done();
          })
    })
  })

});
