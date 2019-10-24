const request = require("supertest");
const server = require("../server");
require("dotenv").config();

describe("sensors router", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  }); 
})

//Test POST a sensor
describe('POST /api/sensors', function (){
  let sensor = {
    pump_id: 1,
    physical_id: 12325,
    kind: "B",
    type: "A",
    cellular: 1,
    bluetooth: 1,
    training: "training",
    remark: "good tests",
    data_finished: "2018-11-02",
    depth: 221,
    yield: 21,
    static: 1,
    quality: "fair"
  }
  it('respond with 200 created', function (done){
    request(server)
        .post('/api/sensors')
        .send(sensor)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err)=> {
          if (err) return done(err);
          done()
        })
  })
})

//Test GET all sensors
describe('GET /api/sensors', function (){
  it('respond with json containing a list of all sensors', function (done){
    request(server)
        .get('/api/sensors')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done)
  })
})

//Test GET sensor by id
describe('GET /api/sensors/:id', function (){
  it('respond with json containing a single pump', function (done){
    request(server)
        .get('/api/sensors/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done)
  })

  it('respond with json sensor not found', function (done){
    request(server)
        .get('/api/sensors/notaproperid')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err) => {
          if(err) return done(err);
          done();
        })
  })
})



// const request = require("supertest");
// const Sensors = require("./sensors.model");
// const db = require("../../data/dbConfig");
// require("dotenv").config();

// describe("sensors router", () => {
//   beforeEach(async () => {
//     await db("sensors").truncate();
//   });

//   it("should set environment to testing", () => {
//     expect(process.env.DB_ENV).toBe("test");
//   });

//   describe("addSensor()", () => {
//     it("should add a sensor into the db", async () => {
//       await Sensors.addSensor({
//         pump_id: 1,
//         physical_id: 12325,
//         kind: "B",
//         type: "A",
//         cellular: 1,
//         bluetooth: 1,
//         training: "training",
//         remark: "good tests",
//         data_finished: "2018-11-02",
//         depth: 221,
//         yield: 21,
//         static: 1,
//         quality: "fair"
//       });
//       let sensor = await db("sensors");
//       expect(sensor).toHaveLength(1);
//     });

//     it("should add a sensor into the db", async () => {
//       const { id } = await Sensors.addSensor({
//         pump_id: 1,
//         physical_id: 12325,
//         kind: "B",
//         type: "A",
//         cellular: 1,
//         bluetooth: 1,
//         training: "training",
//         remark: "good tests",
//         data_finished: "2018-11-02",
//         depth: 221,
//         yield: 21,
//         static: 1,
//         quality: "fair"
//       });
//       //   console.log("id", id);
//       let sensor = await db("sensors")
//         .where({ id })
//         .first();
//       //   console.log(sensor);
//       expect(sensor.quality).toBe("fair");
//     });
//   });
// });
