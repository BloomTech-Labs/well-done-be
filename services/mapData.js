const Data = require("../assets/cache/pumps.json");
const PumpModel = require("../api/pumps/pumps.model");
const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile");
const db = require("../data/dbConfig");

const getPumps = Data.pumps.map(pump => console.log(pump))

const seedJSONSensors = () => {
  Data.pumps.map(data => {
    // console.log(data);
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
      well_depth: well_depth,
      yield: yield,
      static: static
    };
    addSensor(sensor);
    console.log(sensor);
  });
};


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
      console.log(pump);
    });
  };

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

seedJSONPumps();

module.exports = seedJSONPumps, seedJSONSensors, getPumps;
