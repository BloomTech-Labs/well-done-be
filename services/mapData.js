const Data = require("../assets/cache/pumps.json");
const PumpModel = require("../api/pumps/pumps.model");
const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile");
const db = require("../data/dbConfig");

// const getPumps = Data.pumps.map(pump => console.log("getPumps", pump))

const seedJSONSensors = () => {
  Data.pumps.map(data => {
    console.log(data);
    const {
      id,
      finish_construction,
      well_depth,
      yield,
      static,
    } = data;
    const sensor = {
      physical_id: id,
      data_finished: finish_construction,
      depth: well_depth,
      yield: yield,
      static: static
    };
    addSensor(sensor);
    // console.log("sensor", sensor);
  });
};

seedJSONSensors()

const seedJSONPumps = () => {
    Data.pumps.map(data => {
      // console.log(data);
      const {
        id,
        latitude,
        longitude,
        village: { village, commune, district, province }
      } = data;
      const pump = {
        sensor_ID: id,
        latitude: latitude,
        longitude: longitude,
        country_name: village,
        commune_name: commune,
        district_name: district,
        province_name: province
      };
      addPump(pump);
    //   console.log("pump", pump);
    });
  };

  seedJSONPumps();

  
// "date": {
// "statuses": {
//     "date": "Thu Oct 24 2019",
//     "count": 109,
//     "total": 3219199,
//     "status": 2,
//     "pad_counts": [
   const seedJSONHistory = () => {
     Data.pumps.map(data => {
        console.log('current data map = ', data);
       const {
         id,
         date: { statuses: {date, count, status, pad_counts, pad_seconds, reportedPercent}}} = data;
       const history = {
         sensor_id: id,
         count: count,
         total: total,
         status: status,
         date: date,
         pad_counts: pad_counts,
         pad_seconds: pad_seconds,
         reportedPercent: reportedPercent
       };
       addHistory(history);
      //  console.log("history", history);
     });
   };

  seedJSONHistory()

function addPump(pump) {
  return db("pumps")
    .insert(pump)
    .returning("id")
    .then(res => {
      console.log(res);
    });
}

function addSensor(sensor) {
    return db("sensors")
      .insert(sensor)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

  function addHistory(history) {
    return db("history")
      .insert(history)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

//seedJSONHistory,
module.exports = seedJSONPumps, seedJSONHistory, seedJSONSensors;
